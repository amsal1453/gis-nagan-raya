import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Globe = () => {
    const mountRef = useRef(null);
    const globeRef = useRef(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });

        // Set size to match container
        const container = mountRef.current;
        const size = Math.min(container.clientWidth, container.clientHeight);
        renderer.setSize(size, size);
        container.appendChild(renderer.domElement);

        // Create globe
        const geometry = new THREE.SphereGeometry(2, 64, 64);
        const textureLoader = new THREE.TextureLoader();

        // Load earth texture with a more realistic map
        const material = new THREE.MeshPhongMaterial({
            map: textureLoader.load("/images/earth-texture.jpg", (texture) => {
                texture.minFilter = THREE.LinearFilter;
                renderer.render(scene, camera);
            }),
            bumpMap: textureLoader.load("/images/earth-bump.jpg", (texture) => {
                texture.minFilter = THREE.LinearFilter;
                renderer.render(scene, camera);
            }),
            specularMap: textureLoader.load(
                "/images/earth-specular.jpg",
                (texture) => {
                    texture.minFilter = THREE.LinearFilter;
                    renderer.render(scene, camera);
                }
            ),
            bumpScale: 0.05,
            specular: new THREE.Color("#909090"),
            shininess: 15,
        });

        const globe = new THREE.Mesh(geometry, material);
        scene.add(globe);
        globeRef.current = globe;

        // Enhance lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        camera.position.z = 5;

        // Animation
        let frameId;
        const animate = () => {
            frameId = requestAnimationFrame(animate);

            if (globeRef.current) {
                globeRef.current.rotation.y += 0.002;
            }

            renderer.render(scene, camera);
        };

        animate();

        // Interactive controls
        let isDragging = false;
        let previousMousePosition = { x: 0, y: 0 };

        const handleMouseDown = (e) => {
            isDragging = true;
            previousMousePosition = {
                x: e.clientX,
                y: e.clientY,
            };
        };

        const handleMouseMove = (e) => {
            if (!isDragging) return;

            const deltaMove = {
                x: e.clientX - previousMousePosition.x,
                y: e.clientY - previousMousePosition.y,
            };

            if (globeRef.current) {
                globeRef.current.rotation.y += deltaMove.x * 0.005;
                globeRef.current.rotation.x += deltaMove.y * 0.005;
            }

            previousMousePosition = {
                x: e.clientX,
                y: e.clientY,
            };
        };

        const handleMouseUp = () => {
            isDragging = false;
        };

        container.addEventListener("mousedown", handleMouseDown);
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseup", handleMouseUp);
        container.addEventListener("mouseleave", handleMouseUp);

        // Cleanup
        return () => {
            if (frameId) {
                cancelAnimationFrame(frameId);
            }
            container.removeEventListener("mousedown", handleMouseDown);
            container.removeEventListener("mousemove", handleMouseMove);
            container.removeEventListener("mouseup", handleMouseUp);
            container.removeEventListener("mouseleave", handleMouseUp);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="w-full h-full rounded-lg overflow-hidden cursor-move"
            aria-label="Interactive 3D Globe"
        />
    );
};

export default Globe;
