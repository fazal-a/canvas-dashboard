import { WidgetDefinition } from '@/types';
import { TodaysSchedule } from '@/components/widgets/appointments/TodaysSchedule';
import { DailyStats } from '@/components/widgets/stats/DailyStats';
import { OutstandingItems } from '@/components/widgets/stats/OutstandingItems';
import { QuickActions } from '@/components/widgets/actions/QuickActions';
import { VoiceNote } from '@/components/widgets/speech/VoiceNote';
import React from "react";

export const widgetDefinitions: WidgetDefinition[] = [
    {
        type: 'todays_schedule',
        title: "Today's Schedule",
        description: "List view of today's appointments with patient details",
        category: 'Calendar & Scheduling',
        icon: '📅',
        defaultWidth: 6,
        defaultHeight: 3,
        minWidth: 4,
        minHeight: 2,
    },
    {
        type: 'daily_stats',
        title: 'Daily Statistics',
        description: 'Overview of appointments and patient metrics',
        category: 'Analytics & Reports',
        icon: '📊',
        defaultWidth: 3,
        defaultHeight: 2,
        minWidth: 3,
        minHeight: 2,
    },
    {
        type: 'outstanding_items',
        title: 'Outstanding Items',
        description: 'Open notes, pending labs, messages, and recalls',
        category: 'Clinical Dashboard',
        icon: '⚠️',
        defaultWidth: 4,
        defaultHeight: 2,
        minWidth: 3,
        minHeight: 2,
    },
    {
        type: 'quick_actions',
        title: 'Quick Actions',
        description: 'Frequently used action buttons',
        category: 'Quick Actions',
        icon: '⚡',
        defaultWidth: 3,
        defaultHeight: 2,
        minWidth: 2,
        minHeight: 2,
    },
    {
        type: 'voice_note',
        title: 'Voice Transcription',
        description: 'Real-time speech-to-text with AssemblyAI',
        category: 'Clinical Dashboard',
        icon: '🎤',
        defaultWidth: 4,
        defaultHeight: 3,
        minWidth: 3,
        minHeight: 2,
    },
];

export const widgetComponents: Record<string, React.ComponentType<any>> = {
    todays_schedule: TodaysSchedule,
    daily_stats: DailyStats,
    outstanding_items: OutstandingItems,
    quick_actions: QuickActions,
    voice_note: VoiceNote,
};

export function getWidgetDefinition(type: string): WidgetDefinition | undefined {
    return widgetDefinitions.find((def) => def.type === type);
}

export function getWidgetComponent(type: string): React.ComponentType<any> | undefined {
    return widgetComponents[type];
}
