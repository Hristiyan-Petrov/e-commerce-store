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