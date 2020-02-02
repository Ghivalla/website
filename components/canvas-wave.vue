<template>
	<div class="canvas">
      <canvas  ref="canvas"/>
    </div>
</template>
<script>
export default {
	data() {
		return {
			canvas: null,

			ctx : null,

			wave : null,

			strokeColor : {
				h: 200,
				s: 50,
				l: 50
			},

			bgColor : {
				r: 0,
				g: 0,
				b: 100,
				a: 0.1
			},

			increment : null
		}
	},

	methods: {
		animate() {
			requestAnimationFrame(this.animate)
			this.ctx.fillStyle = `rgba(
				${this.bgColor.r},
				${this.bgColor.g},
				${this.bgColor.b},
				${this.bgColor.a}
			)`
			this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height)
			this.ctx.beginPath()
			this.ctx.moveTo(0, this.canvas.height / 2)

			for (let i = 0; i < this.canvas.width; i++) {
				this.ctx.lineTo(i,
					this.wave.y
					+ Math.sin(i * this.wave.length + this.increment)
					* this.wave.amplitude
					* Math.sin(this.increment)
				)
			}
			this.ctx.strokeStyle = `hsl(
				${this.strokeColor.h },
				${this.strokeColor.s}%,
				${this.strokeColor.l}%
			)`;
			this.ctx.stroke()
			this.increment += this.wave.frequency
		}
	},

	mounted() {
		this.canvas = this.$refs.canvas
		this.ctx = this.canvas.getContext('2d')
		this.canvas.width = innerWidth
		this.canvas.height = innerHeight
		this.wave = {
			y: this.canvas.height / 2,
			length: 0.01,
			amplitude: 100,
			frequency: 0.025
		},
		this.increment = this.wave.frequency
		this.animate()
	}
}
</script>
<style lang="sass" scoped>
 canvas
    position: fixed
    z-index: -2
    top: 0
    left: 0
</style>