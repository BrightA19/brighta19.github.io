/* global cvs ctx angleOfGravity */

// Gravitational Arrow object constructor. It renders an arrow
// representing the direction of the gravitational force
function Arrow() {
    this.render = function () {
        var center = {
            x: cvs.width / 2,
            y: cvs.height / 2
        };
        
        ctx.save();
        ctx.translate(center.x, center.y);
        ctx.rotate(angleOfGravity * Math.PI / 180);
        
        ctx.beginPath();
        ctx.moveTo(center.y / 2, 0);
        ctx.lineTo(0, -150);
        ctx.lineTo(0, -64);
        ctx.lineTo(-center.y / 2, -64);
        ctx.lineTo(-center.y / 2, 64);
        ctx.lineTo(0, 64);
        ctx.lineTo(0, 150);
        ctx.closePath();
        
        ctx.lineWidth = 1;
        ctx.strokeStyle = "gray";
        ctx.stroke();
        ctx.restore();
    };
}
