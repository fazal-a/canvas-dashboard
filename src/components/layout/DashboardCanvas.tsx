import React from 'react';
import { Box } from '@mui/material';
import GridLayout, { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { useDashboardStore } from '../../store/dashboardStore';
import { getWidgetComponent } from '../../utils/widgetRegistry';

import { Responsive, WidthProvider } from "react-grid-layout";

const ResponsiveGridLayout = WidthProvider(Responsive);

export const DashboardCanvas: React.FC = () => {
    const widgets = useDashboardStore((state) => state.widgets);
    const layout = useDashboardStore((state) => state.layout);
    const isEditMode = useDashboardStore((state) => state.isEditMode);
    const updateLayout = useDashboardStore((state) => state.updateLayout);

    const handleLayoutChange = (newLayout: Layout[]) => {
        updateLayout(newLayout);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <ResponsiveGridLayout
                className="layout"
                // layout={layout}
                // cols={12}
                rowHeight={100}
                // width={'1200'}
                onLayoutChange={handleLayoutChange}
                isDraggable={isEditMode}
                isResizable={isEditMode}
                compactType="vertical"
                preventCollision={false}
                margin={[20, 20]}
                containerPadding={[0, 0]}
                useCSSTransforms={true}
                draggableHandle=".MuiCardHeader-root"
            >
                {widgets.map((widget) => {
                    const WidgetComponent = getWidgetComponent(widget.type);

                    if (!WidgetComponent) {
                        return (
                            <div key={widget.i}>
                                <Box
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'rgba(255, 0, 0, 0.1)',
                                        border: '1px solid red',
                                        borderRadius: 2,
                                    }}
                                >
                                    Widget "{widget.type}" not found
                                </Box>
                            </div>
                        );
                    }

                    return (
                        <div key={widget.i}>
                            <WidgetComponent widget={widget} />
                        </div>
                    );
                })}
            </ResponsiveGridLayout>
        </Box>
    );
};
