import { useEffect, useRef } from "react";
import * as THREE from "three";

// A restrained, single decorative moment for the hero: a slowly turning gold
// ring with a lathed bud form at its centre, echoing the two motifs in the
// brand mark (the circle and the rising bud). Everything else on the page is
// still — this is where the page spends its "boldness".
export default function HeroEmblem({ className }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      38,
      mount.clientWidth / mount.clientHeight || 1,
      0.1,
      100
    );
    camera.position.set(0, 0.15, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // ---- Lighting: warm gold key light + cool emerald fill, matching the palette ----
    const keyLight = new THREE.PointLight(0xf4dfa8, 6.5, 20, 2);
    keyLight.position.set(3, 3.5, 4);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x2c9573, 3.2, 20, 2);
    fillLight.position.set(-3.5, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfbf5e7, 1.1);
    rimLight.position.set(-2, 3, -4);
    scene.add(rimLight);

    scene.add(new THREE.AmbientLight(0x3a2c14, 0.6));

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc9a45c,
      metalness: 0.85,
      roughness: 0.28,
      emissive: 0x3a2a10,
      emissiveIntensity: 0.15,
    });

    const group = new THREE.Group();
    scene.add(group);

    // ---- Ring, echoing the circle in the brand mark ----
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.045, 32, 128),
      goldMaterial
    );
    group.add(ring);

    // ---- Lathed bud/flame form at the centre ----
    const profilePoints = [
      new THREE.Vector2(0.0, -1.55),
      new THREE.Vector2(0.22, -1.3),
      new THREE.Vector2(0.34, -0.95),
      new THREE.Vector2(0.24, -0.55),
      new THREE.Vector2(0.32, -0.15),
      new THREE.Vector2(0.18, 0.25),
      new THREE.Vector2(0.22, 0.6),
      new THREE.Vector2(0.08, 0.95),
      new THREE.Vector2(0.0, 1.1),
    ];
    const bud = new THREE.Mesh(
      new THREE.LatheGeometry(profilePoints, 48),
      goldMaterial
    );
    bud.scale.setScalar(0.62);
    bud.position.y = 0.05;
    group.add(bud);

    // ---- Fine gold dust, drifting slowly ----
    const dustCount = 90;
    const dustGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i += 1) {
      const radius = 2.6 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = radius * Math.cos(phi) * 0.6;
    }
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({
        color: 0xe8ce93,
        size: 0.028,
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
      })
    );
    scene.add(dust);

    group.rotation.x = 0.18;

    let frameId;
    let paused = false;
    const clock = new THREE.Clock();
    const pointer = { x: 0, y: 0 };

    const handlePointerMove = (event) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener("pointermove", handlePointerMove);

    const animate = () => {
      if (paused) return;
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        group.rotation.y = elapsed * 0.22;
        bud.rotation.y = -elapsed * 0.12;
        dust.rotation.y = elapsed * 0.05;
        group.position.y = Math.sin(elapsed * 0.6) * 0.06;
      }

      // Gentle parallax that responds to pointer position (a user-triggered
      // moment, not ambient motion), eased toward the target each frame.
      camera.position.x += (pointer.x * 0.5 - camera.position.x) * 0.03;
      camera.position.y += (0.15 - pointer.y * 0.3 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    frameId = requestAnimationFrame(animate);

    // Pause the render loop when the emblem scrolls out of view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        paused = !entry.isIntersecting;
        if (!paused) {
          frameId = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(frameId);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(mount);

    const handleResize = () => {
      const { clientWidth, clientHeight } = mount;
      if (!clientWidth || !clientHeight) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      ring.geometry.dispose();
      bud.geometry.dispose();
      dustGeometry.dispose();
      goldMaterial.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={className} aria-hidden="true" />;
}
