function Tooltip(options) {
    this._listenedBlock = options.parent || document.body; //DOM object
    this.class = options.itemSelector; //str, several classes alowed
    this.extraMargin = options.extraMargin || 0;
    this.init();
}
Tooltip.prototype.init = function () {
    if (!this._listenedBlock) return;

    this._listenedBlock.addEventListener('mouseover', this.showTooltip.bind(this));
    this._listenedBlock.addEventListener('mouseout', this.removeTooltip.bind(this));
};
Tooltip.prototype.showTooltip = function (e) {
    var target = e.target;
    var tooltipText = target.getAttribute('data-tooltip');

    if(!tooltipText) return;

    var tooltip = document.createElement('span');
    tooltip.id = 'tooltip';
    if (this.class) tooltip.className = this.class;
    tooltip.innerHTML = tooltipText;
    document.body.appendChild(tooltip);

    var coordsBtn = this.getCoords(target);
    var coordsTooltip = this.getCoords(tooltip);

    var tooltipWidth = tooltip.offsetWidth;
    var tooltipHeight = tooltip.offsetHeight + this.extraMargin;
    var btnWidth = target.offsetWidth;
    var toolPosXLeft = coordsBtn.left + (btnWidth - tooltipWidth) / 2;
    var toolPosXRight = coordsBtn.right + (tooltipWidth - btnWidth) / 2;
    var wWdith = document.documentElement.clientWidth;
    var toolPosX;

    if (toolPosXLeft < 0) {
        toolPosX = 0;
    } else if (toolPosXRight > wWdith) {
        toolPosX = wWdith - tooltipWidth;
    } else {
        toolPosX = toolPosXLeft;
    }
    tooltip.style.left = toolPosX + 'px';
    tooltip.style.top = (coordsBtn.bottom + this.extraMargin) + 'px';

};
Tooltip.prototype.removeTooltip = function (e) {
    var tooltip = document.getElementById('tooltip');

    if(!tooltip) return;

    document.body.removeChild(tooltip);
};
Tooltip.prototype.getCoords = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        bottom: box.bottom + pageYOffset,
        left: box.left + pageXOffset,
        right: box.right + pageXOffset
    };
};

export default Tooltip;
