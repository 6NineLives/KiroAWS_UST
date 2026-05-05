"use client"

import { cn } from "@/lib/utils"

export interface TabDefinition {
  id: string
  label: string
}

interface TabsNavProps {
  tabs: readonly TabDefinition[]
  activeTab: string
  onChange: (id: string) => void
  ariaLabel?: string
}

export function TabsNav({ tabs, activeTab, onChange, ariaLabel }: TabsNavProps) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex flex-wrap gap-2 border-b border-border bg-card px-4 sm:px-6"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${tab.id}`}
            aria-controls={`panel-${tab.id}`}
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative -mb-px border-b-2 px-4 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              isActive
                ? "border-brand-gold-strong text-brand-blue"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
