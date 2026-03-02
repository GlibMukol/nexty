import React from 'react';

// This is a proxy to mock any named export from lucide-react.
// It returns a dummy SVG component for any icon that is imported.
// This is useful for Jest tests to avoid issues with ESM modules.
const lucideReactMock = new Proxy(
    {},
    {
        get: function (target, prop) {
            const MockIcon = (props: React.SVGProps<SVGSVGElement>) => (
                <svg {...props} data-lucide-icon={String(prop)} />
            );
            MockIcon.displayName = `LucideIcon(${String(prop)})`;
            return MockIcon;
        },
    },
);

export default lucideReactMock;