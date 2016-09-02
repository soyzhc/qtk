
describe('DnD', function() {
	var Events = qtk.Events;
	var app = new qtk.Application.create("test");
	app.init({themeDataURL:"/base/www/theme/default/theme.json"});
	var win = qtk.WindowNormal.create().init(app, 0, 0, 1000, 1000, false);
	var widget = qtk.Widget.create();
	widget.move(0, 0).resize(100, 100);
	win.addChild(widget);
	widget.useBehavior("draggable");	
	
	var target = qtk.Widget.create();
	target.name = "target";
	target.move(200, 200).resize(200, 200);
	win.addChild(target);
	target.useBehavior("droppable");	

	var matrixStack = qtk.MatrixStack.create();

	function dispatchEventToWin(downX, downY, moveX, moveY) {
    	var detail = {pointerDown:true, pointerDownX:downX, pointerDownY:downY, x:downX, y:downX, id:1};	
    	var e = Events.PointerEvent.create(Events.POINTER_DOWN, detail);

		win.dispatchPointerDown(e, matrixStack);
		detail.x = moveX;
		detail.y = moveY;
    	e = Events.PointerEvent.create(Events.POINTER_MOVE, detail);
		win.dispatchPointerMove(e, matrixStack);
    	e = Events.PointerEvent.create(Events.POINTER_UP, detail);
		win.dispatchPointerUp(e, matrixStack);
	}

	var dragStart = false;
	var dragEnd = false;
	var dragOver = false;
	var dragDrop = false;

    it('test DnD', (done) => {
    	widget.on(Events.DRAGSTART, evt => {
			dragStart = true;
		});
    	target.on(Events.DROP, evt => {
			dragDrop = true;
		});
    	target.on(Events.DRAGOVER, evt => {
			dragOver = true;
		});
    	widget.on(Events.DRAGEND, evt => {
			var result = dragStart && dragDrop && dragOver;	
			done(result ? null : new Error("DnD"));
		});
		dispatchEventToWin(10, 10, 300, 300);
    });
 })

