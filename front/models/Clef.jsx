import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useCursor } from '@react-three/drei';
import { useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Clef = (props) => {
  const group = useRef();

  const { nodes, materials } = useGLTF('/models/telekom.glb');

  // Загрузка текстур
  const texturePaths = [
    '/images/web_112.webp',
    // '/images/acrylic-blue-textured-background-abstract-creative-art.jpg',
    // '/images/scott-webb-OxHPDs4WV8Y-unsplash.jpg',
    // '/images/Texture4.jpg',

  ];
  const textures = useLoader(TextureLoader, texturePaths);

  // Индекс текущей текстуры
  const [currentTextureIndex, setCurrentTextureIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  if (!nodes || !nodes.Mesh_0) {
    console.log('Модель еще загружается или узел Mesh_0 отсутствует.');
    return null;
  }

  // Анимационные параметры
  const amplitude = 0.3;
  const frequency = 2;
  const amplitudeY = 0.45;
  const frequencyY = 3;
  const time = useRef(0.01);

  const initialYPosition = useRef(0);
  const initialZPosition = useRef(props.position ? props.position[2] : 0);

  // Параметры анимации отскока
  const bounceProgress = useRef(0);
  const bounceDuration = 0.34; // Длительность отскока в секундах
  const bounceDistance = 2; // Расстояние отскока

  // Счетчик кликов
  const clickCount = useRef(0);

  // Параметры анимации вращения
  const rotationDuration = 0.4; // Длительность вращения в секундах
  const rotationProgress = useRef(0);
  const isRotating = useRef(false);

  useEffect(() => {
    if (group.current) {
      group.current.rotation.set(0, Math.PI, 0);
      initialYPosition.current = group.current.position.y;
      initialZPosition.current = group.current.position.z;
    }
  }, [nodes]);

  useFrame((state, delta) => {
    if (group.current) {
      time.current += delta;

      // Существующая анимация
      const yPosition = amplitudeY * Math.sin(frequencyY * time.current);
      let angle = amplitude * Math.sin(frequency * time.current);

      // Анимация вращения на 360 градусов
      if (isRotating.current) {
        rotationProgress.current += delta;
        const t = rotationProgress.current / rotationDuration;
        if (t < 1) {
          // Вращение на 360 градусов
          angle += Math.PI * 2 * t;
        } else {
          // Завершение вращения
          isRotating.current = false;
          rotationProgress.current = 0;
        }
      }

      group.current.position.y = initialYPosition.current + yPosition;
      group.current.rotation.y = angle + Math.PI;

      // Анимация отскока
      if (bounceProgress.current < bounceDuration) {
        bounceProgress.current += delta;
        const t = bounceProgress.current / bounceDuration;
        const bounceAmount = -bounceDistance * Math.sin(Math.PI * t);
        group.current.position.z = initialZPosition.current + bounceAmount;
      } else {
        group.current.position.z = initialZPosition.current;
      }
    }
  });

  const handleClick = () => {
    // Переключение текстуры
    setCurrentTextureIndex((prevIndex) => (prevIndex + 1) % textures.length);
    bounceProgress.current = 0; // Сброс анимации отскока

    // Увеличение счетчика кликов
    clickCount.current += 1;

    // Если количество кликов кратно 4, запускаем анимацию вращения
    if (clickCount.current % 4 === 0) {
      isRotating.current = true;
      rotationProgress.current = 0;
    }
  };

  return (
    <group ref={group} {...props}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0.geometry}
        onBeforeRender={() => nodes.Mesh_0.geometry.center()}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          map={textures[currentTextureIndex]}
          metalness={0.7}
          roughness={0}
        />
      </mesh>
    </group>
  );
};

export default Clef;

useGLTF.preload('/models/telekom.glb');
