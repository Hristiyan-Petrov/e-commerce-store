
// const theme = useTheme();
// export const screenQueries = {
//     isSmallScreen: useMediaQuery(theme.breakpoints.down('md')),

// };

export const underlineHoverEffect = (topValue = 2) => ({
    '&::after': {
        content: '""',
        position: 'absolute',
        top: `${topValue}rem`,
        left: 0,
        right: 0,
        height: '5px',
        backgroundColor: 'primary.main',
        transform: 'scaleX(0)',
        transformOrigin: 'right',
        transition: 'transform 0.2s',
    },
    '&:hover::after': {
        transform: 'scaleX(1)',
        transformOrigin: 'left',
    }
});

export const hoverBackgroundFill = (borderRadius = 2) => ({
    transition: 'background-color 0.7s',
    borderRadius: borderRadius,
    '&:hover': {
        cursor: 'pointer',
        backgroundColor: 'primary.light',
        transition: 'background-color 0.2s',
    }
});

// START background filling from left
export const backgroundFillBase = (color = 'primary.light', duration = 0.2) => ({
    position: 'relative',
    overflow: 'hidden',
    zIndex: 0, // A zIndex is needed for the pseudo-element's zIndex to work
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: color,
        zIndex: -1, // Puts the background behind the content
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        transition: `transform ${duration}s ease-in-out`,
    },
});


export const backgroundFillHover = () => ({
    '&::before': {
        transform: 'scaleX(1)',
    }
});
// End background filling from left
