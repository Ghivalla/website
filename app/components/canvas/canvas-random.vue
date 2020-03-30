<template>
  <div>
    <canvas ref="landscape" />
  </div>
</template>
<script>
import * as THREE from "three";
import { mapState } from "vuex";
import CustomVertex from "@/utils/custom-vertex.txt";
import CustomFragment from "@/utils/custom-fragment.txt";
// import palleteImage from "@/assets/images/palette-image.";
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
    },
    sceneSetup() {
      this.scene = new THREE.Scene();
      var fogColor = new THREE.Color(0xf4f4f4);
      this.scene.background = fogColor;
      this.scene.fog = new THREE.Fog(fogColor, 0, 400);

      //   this.sky();

      this.camera = new THREE.PerspectiveCamera(
        60,
        this.width / this.height,
        0.1,
        10000
      );
      this.camera.position.y = 8;
      this.camera.position.z = 4;

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      this.scene.add(ambientLight);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.container,
        antialias: true
      });
      this.renderer.setPixelRatio = devicePixelRatio;
      this.renderer.setSize(this.width, this.height);
    },
    sky() {
      const sky = new THREE.Sky();
      sky.scale.setScalar(450000);
      sky.material.uniforms.turbidity.value = 13;
      sky.material.uniforms.rayleigh.value = 1.2;
      sky.material.uniforms.luminance.value = 1;
      sky.material.uniforms.mieCoefficient.value = 0.1;
      sky.material.uniforms.mieDirectionalG.value = 0.58;

      this.scene.add(sky);

      const sunSphere = new THREE.Mesh(
        new THREE.SphereBufferGeometry(20000, 16, 8),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      sunSphere.visible = false;
      this.scene.add(sunSphere);

      var theta = Math.PI * -0.002;
      var phi = 2 * Math.PI * -0.25;

      sunSphere.position.x = 400000 * Math.cos(phi);
      sunSphere.position.y = 400000 * Math.sin(phi) * Math.sin(theta);
      sunSphere.position.z = 400000 * Math.sin(phi) * Math.cos(theta);

      sky.material.uniforms.sunPosition.value.copy(sunSphere.position);
    },
    sceneElements() {
      const geometry = new THREE.PlaneBufferGeometry(100, 400, 400, 400);

      var uniforms = {
        time: { type: "f", value: 0.0 },
        scroll: { type: "f", value: 0.0 },
        distortCenter: { type: "f", value: 0.1 },
        roadWidth: { type: "f", value: 0.5 },
        pallete: { type: "t", value: null },
        speed: { type: "f", value: 2 },
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
        console.log(this.terrain);
        this.terrain.material.uniforms.pallete.value = texture;
        this.terrain.material.needsUpdate = true;
      });
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
  }
};
</script>
<style lang="sass" scoped>
.container
    margin: 0

canvas
    display: block
</style>
