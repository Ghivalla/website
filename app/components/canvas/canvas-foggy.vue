<template>
  <div class="container">
    <canvas ref="landscape" />
  </div>
</template>
<script>
import * as THREE from "three";
import { mapState } from "vuex";
import CustomVertex from "@/utils/custom-vertex.txt";
import CustomFragment from "@/utils/custom-fragment.txt";
export default {
  data() {
    return {
      container: null,
      width: null,
      height: null,
      scene: null,
      renderer: null,
      camera: null,
      terrain: null,
      mouse: { x: 0, y: 0, xDamped: 0, yDamped: 0 },
      isMobile: null
    };
  },
  computed: {
    ...mapState({
      img: state => state.profile.profilePicture.src
    })
  },
  methods: {
    init() {
      this.sceneSetup();
      this.sceneElements();
      this.sceneTextures();
      this.render();
      this.resize();
      if (this.isMobile) {
        window.addEventListener("touchmove", this.onInputMove, {
          passive: false
        });
      } else {
        window.addEventListener("mousemove", this.onInputMove);
      }
      window.addEventListener("resize", this.resize);
      this.resize();
    },
    sceneSetup() {
      this.scene = new THREE.Scene();
      var fogColor = new THREE.Color(0xf4f4f4);
      this.scene.background = fogColor;
      this.scene.fog = new THREE.Fog(fogColor, 0, 400);

      this.camera = new THREE.PerspectiveCamera(
        10,
        this.width / this.height,
        0.1,
        10000
      );
      this.camera.position.y = 8;
      this.camera.position.z = 4;
      this.camera.position.x = 0;

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      this.scene.add(ambientLight);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.container,
        antialias: true
      });
      this.renderer.setPixelRatio = devicePixelRatio;
      this.renderer.setSize(this.width, this.height);
    },
    sceneElements() {
      const geometry = new THREE.PlaneBufferGeometry(100, 400, 400, 400);

      var uniforms = {
        time: { type: "f", value: 0.0 },
        scroll: { type: "f", value: 0.0 },
        distortCenter: { type: "f", value: 0.1 },
        roadWidth: { type: "f", value: 0.5 },
        pallete: { type: "t", value: null },
        speed: { type: "f", value: 3 },
        maxHeight: { type: "f", value: 10.0 },
        color: new THREE.Color(1, 1, 1)
      };

      var material = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.merge([
          THREE.ShaderLib.basic.uniforms,
          uniforms
        ]),
        vertexShader: CustomVertex,
        fragmentShader: CustomFragment,
        wireframe: false,
        fog: true
      });

      this.terrain = new THREE.Mesh(geometry, material);
      this.terrain.position.z = -180;
      this.terrain.rotation.x = -Math.PI / 2;

      this.scene.add(this.terrain);
    },
    sceneTextures() {
      const loader = new THREE.TextureLoader();
      loader.load(this.img, texture => {
        this.terrain.material.uniforms.pallete.value = texture;
        this.terrain.material.needsUpdate = true;
      });
    },
    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
    },
    onInputMove(e) {
      e.preventDefault();
      var x, y;
      if (e.type == "mousemove") {
        x = e.clientX;
        y = e.clientY;
      } else {
        x = e.changedTouches[0].clientX;
        y = e.changedTouches[0].clientY;
      }
      this.mouse.x = x;
      this.mouse.y = y;
    },
    map(value, start1, stop1, start2, stop2) {
      return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
    },
    lerp(start, end, amt) {
      return (1 - amt) * start + amt * end;
    },
    render() {
      requestAnimationFrame(this.render);

      // damping mouse for smoother interaction
      this.mouse.xDamped = this.lerp(this.mouse.xDamped, this.mouse.x, 0.1);
      this.mouse.yDamped = this.lerp(this.mouse.yDamped, this.mouse.y, 0.1);

      var time = performance.now() * 0.001;
      this.terrain.material.uniforms.time.value = time;
      this.terrain.material.uniforms.scroll.value =
        time + this.map(this.mouse.yDamped, 0, this.height, 0, 4);
      this.terrain.material.uniforms.distortCenter.value = Math.sin(time) * 0.1;
      this.terrain.material.uniforms.roadWidth.value = this.map(
        this.mouse.xDamped,
        0,
        this.width,
        1,
        4.5
      );

      this.camera.position.y = this.map(
        this.mouse.yDamped,
        0,
        this.height,
        4,
        11
      );
      this.renderer.render(this.scene, this.camera);
    }
  },
  mounted() {
    this.container = this.$refs.landscape;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isMobile = typeof window.orientation !== "undefined";
    this.init();
  },
  beforeDestroy() {
    this.renderer.dispose();
    window.removeEventListener("touchmove", this.onInputMove);
    window.removeEventListener("mousemove", this.onInputMove);
    window.removeEventListener("resize", this.resize);
  }
};
</script>
<style lang="sass" scoped>
.container
    margin: 0
    position: fixed
    top: 0
    left: 0
    z-index: -1

canvas
    display: block
</style>
