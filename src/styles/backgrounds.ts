import type { Theme } from '@mui/material/styles';
export const heroGradientBackground = (theme: Theme) => ({
    background: `linear-gradient(160deg, ${theme.palette.primary.dark} 0%, #101B4D 55%, #0B1642 100%)`,
    backgroundAttachment: 'fixed',
});
export const functionalBackground = (theme: Theme) => ({
    backgroundColor: '#F5F8FF',
    backgroundImage: `linear-gradient(180deg, ${theme.palette.primary.light}26 0%, ${theme.palette.primary.light}00 30%)`,
    backgroundAttachment: 'scroll',
});
