import { create } from 'zustand';
import { Layout } from 'react-grid-layout';
import { Widget, DashboardLayout, User } from '../types';

interface DashboardStore {
    // User State
    user: User | null;
    setUser: (user: User) => void;

    // Widget State
    widgets: Widget[];
    layout: Layout[];
    isEditMode: boolean;

    // Saved Layouts
    savedLayouts: DashboardLayout[];
    currentLayoutId: string | null;

    // Widget Library
    isWidgetLibraryOpen: boolean;

    // Actions
    addWidget: (widget: Widget, layoutItem: Layout) => void;
    removeWidget: (widgetId: string) => void;
    updateWidget: (widgetId: string, updates: Partial<Widget>) => void;
    updateLayout: (newLayout: Layout[]) => void;
    setWidgets: (widgets: Widget[], layout: Layout[]) => void;

    toggleEditMode: () => void;
    toggleWidgetLibrary: () => void;

    saveCurrentLayout: (name: string) => void;
    loadLayout: (layoutId: string) => void;
    deleteLayout: (layoutId: string) => void;

    // Persistence
    loadFromLocalStorage: () => void;
    saveToLocalStorage: () => void;
}

export const useDashboardStore = create<DashboardStore>((set, get) => ({
    // Initial State
    user: {
        id: '1',
        name: 'Dr. MAQSOOD',
        role: 'physician',
        email: 'maqsood@outsquaremd.com',
    },
    widgets: [],
    layout: [],
    isEditMode: false,
    savedLayouts: [],
    currentLayoutId: null,
    isWidgetLibraryOpen: false,

    // User Actions
    setUser: (user) => set({ user }),

    // Widget Actions
    addWidget: (widget, layoutItem) => {
        set((state) => ({
            widgets: [...state.widgets, widget],
            layout: [...state.layout, layoutItem],
        }));
        get().saveToLocalStorage();
    },

    removeWidget: (widgetId) => {
        set((state) => ({
            widgets: state.widgets.filter((w) => w.i !== widgetId),
            layout: state.layout.filter((l) => l.i !== widgetId),
        }));
        get().saveToLocalStorage();
    },

    updateWidget: (widgetId, updates) => {
        set((state) => ({
            widgets: state.widgets.map((w) =>
                w.i === widgetId ? { ...w, ...updates } : w
            ),
        }));
        get().saveToLocalStorage();
    },

    updateLayout: (newLayout) => {
        set({ layout: newLayout });
        get().saveToLocalStorage();
    },

    setWidgets: (widgets, layout) => {
        set({ widgets, layout });
    },

    // UI Actions
    toggleEditMode: () => {
        set((state) => ({ isEditMode: !state.isEditMode }));
    },

    toggleWidgetLibrary: () => {
        set((state) => ({ isWidgetLibraryOpen: !state.isWidgetLibraryOpen }));
    },

    // Layout Management
    saveCurrentLayout: (name) => {
        const { widgets, layout, savedLayouts } = get();
        const newLayout: DashboardLayout = {
            id: Date.now().toString(),
            name,
            widgets: JSON.parse(JSON.stringify(widgets)),
            layout: JSON.parse(JSON.stringify(layout)),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const updatedLayouts = [...savedLayouts, newLayout];
        set({
            savedLayouts: updatedLayouts,
            currentLayoutId: newLayout.id,
        });

        localStorage.setItem('savedLayouts', JSON.stringify(updatedLayouts));
    },

    loadLayout: (layoutId) => {
        const { savedLayouts } = get();
        const layout = savedLayouts.find((l) => l.id === layoutId);

        if (layout) {
            set({
                widgets: JSON.parse(JSON.stringify(layout.widgets)),
                layout: JSON.parse(JSON.stringify(layout.layout)),
                currentLayoutId: layoutId,
            });
            get().saveToLocalStorage();
        }
    },

    deleteLayout: (layoutId) => {
        set((state) => ({
            savedLayouts: state.savedLayouts.filter((l) => l.id !== layoutId),
            currentLayoutId: state.currentLayoutId === layoutId ? null : state.currentLayoutId,
        }));

        const { savedLayouts } = get();
        localStorage.setItem('savedLayouts', JSON.stringify(savedLayouts));
    },

    // Persistence
    loadFromLocalStorage: () => {
        try {
            const widgetsData = localStorage.getItem('dashboardWidgets');
            const layoutData = localStorage.getItem('dashboardLayout');
            const savedLayoutsData = localStorage.getItem('savedLayouts');

            if (widgetsData && layoutData) {
                set({
                    widgets: JSON.parse(widgetsData),
                    layout: JSON.parse(layoutData),
                });
            }

            if (savedLayoutsData) {
                set({
                    savedLayouts: JSON.parse(savedLayoutsData),
                });
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
        }
    },

    saveToLocalStorage: () => {
        const { widgets, layout } = get();
        try {
            localStorage.setItem('dashboardWidgets', JSON.stringify(widgets));
            localStorage.setItem('dashboardLayout', JSON.stringify(layout));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
        }
    },
}));
