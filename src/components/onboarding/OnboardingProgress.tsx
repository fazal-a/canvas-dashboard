import React from 'react';
import { OnboardingSection } from '@/types/onboarding';
import { Check } from 'lucide-react';

interface OnboardingProgressProps {
    sections: OnboardingSection[];
    completedSections: string[];
    activeSection: string;
    onSectionClick: (sectionId: string) => void;
}

export default function OnboardingProgress({
                                               sections,
                                               completedSections,
                                               activeSection,
                                               onSectionClick
                                           }: OnboardingProgressProps) {
    const progress = (completedSections.length / sections.length) * 100;

    return (
        <div className="bg-zinc-900/50 px-6 py-4 border-b border-white/10">
            {/* Progress Bar */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-white/60">
            {completedSections.length} of {sections.length} completed
          </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-[rgb(var(--primary))] to-[rgb(var(--accent))]
                     transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-between">
                {sections.map((section, index) => (
                    <div
                        key={section.id}
                        className="flex items-center"
                    >
                        <button
                            onClick={() => onSectionClick(section.id)}
                            className={`relative flex flex-col items-center gap-2 p-2 rounded-lg 
                        transition-all hover:bg-white/5 cursor-pointer
                        ${activeSection === section.id ? 'bg-white/10' : ''}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center
                            ${completedSections.includes(section.id)
                                ? 'bg-green-500 text-black'
                                : activeSection === section.id
                                    ? 'bg-[rgb(var(--primary))] text-black'
                                    : 'bg-white/20 text-white'
                            }`}>
                                {completedSections.includes(section.id) ? (
                                    <Check className="w-5 h-5" />
                                ) : (
                                    <span className="text-sm font-semibold">{index + 1}</span>
                                )}
                            </div>
                            <span className="text-xs text-white/60 whitespace-nowrap">{section.title}</span>
                        </button>

                        {index < sections.length - 1 && (
                            <div className={`w-full h-[2px] mx-2
                            ${completedSections.includes(sections[index + 1].id)
                                ? 'bg-green-500'
                                : 'bg-white/20'}`}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
