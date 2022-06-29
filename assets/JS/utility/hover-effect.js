function hoverEffect(leftSide, rightSide, containerHover) {
    leftSide.addEventListener('mouseenter', function () {
        containerHover.classList.add('js--hover-left');
    });

    leftSide.addEventListener('mouseleave', function () {
        containerHover.classList.remove('js--hover-left');
    });

    rightSide.addEventListener('mouseenter', function () {
        containerHover.classList.add('js--hover-right');
    });

    rightSide.addEventListener('mouseleave', function () {
        containerHover.classList.remove('js--hover-right');
    });
}

export { hoverEffect };
