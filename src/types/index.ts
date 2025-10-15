import { Layout } from 'react-grid-layout';

// Widget Types
export interface WidgetConfig {
    refreshRate?: number;
    displayMode?: 'compact' | 'detailed' | 'list' | 'grid';
    filters?: Record<string, any>;
}

export interface Widget {
    i: string; // id for react-grid-layout
    type: string;
    title: string;
    config?: WidgetConfig;
}

export interface WidgetDefinition {
    type: string;
    title: string;
    description: string;
    category: string;
    icon: string;
    defaultWidth: number;
    defaultHeight: number;
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
}

// Dashboard Types
export interface DashboardLayout {
    id: string;
    name: string;
    widgets: Widget[];
    layout: Layout[];
    createdAt: Date;
    updatedAt: Date;
}

// User Types
export interface User {
    id: string;
    name: string;
    role: 'physician' | 'nurse' | 'admin' | 'billing' | 'front-desk';
    email: string;
    avatar?: string;
}

// Appointment Types
export interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    dateOfBirth: string;
    age: number;
    gender: string;
    startTime: string;
    endTime: string;
    type: string;
    status: 'scheduled' | 'checked-in' | 'in-progress' | 'completed' | 'cancelled';
    provider: string;
    location: string;
}

// Stats Types
export interface DailyStats {
    scheduled: number;
    completed: number;
    inOffice: number;
    cancelled: number;
    noShow: number;
}

export interface OutstandingItemsData {
    openNotes: number;
    pendingLabs: number;
    messages: number;
    recallsDue: number;
}
