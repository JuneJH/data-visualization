

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

ctx.translate(0, canvas.height);
ctx.scale(1, -1);
ctx.lineCap = 'round';
// context 是我们的 Canvas2D 上下文
// v0是起始向量
// length 是当前树枝的长度
// thickness 是当前树枝的粗细
// dir 是当前树枝的方向，用与 x 轴的夹角表示，单位是弧度。
// bias 是一个随机偏向因子，用来让树枝的朝向有一定的随机性
function drawBranch(context, v0, length, thickness, dir, bias) {
  const v = new Vector2D().rotate(dir).scale(length);
  const v1 = v0.copy().add(v);

  context.lineWidth = thickness;
  context.beginPath();
  context.moveTo(...v0);
  context.lineTo(...v1);
  context.stroke();

  if (thickness > 2) {
    const left = Math.PI / 4 + 0.5 * (dir + 0.2) + bias * (Math.random() - 0.5);
    // const left = dir - 0.2;
    drawBranch(context, v1, length * 0.9, thickness * 0.8, left, bias * 0.9);
    // const right = dir + 0.2
    const right = Math.PI / 4 + 0.5 * (dir - 0.2) + bias * (Math.random() - 0.5);
    drawBranch(context, v1, length * 0.9, thickness * 0.8, right, bias * 0.9);
  }

  if (thickness < 5 && Math.random() < 0.3) {
    context.save();
    context.strokeStyle = 'red';
    const th = Math.random() * 6 + 3;
    context.lineWidth = th;
    context.beginPath();
    context.moveTo(...v1);
    context.lineTo(v1.x, v1.y - 2);
    context.stroke();
    context.restore();
  }
}

const v0 = new Vector2D(255, 0);
drawBranch(ctx, v0, 50, 10, Math.random(), 3);