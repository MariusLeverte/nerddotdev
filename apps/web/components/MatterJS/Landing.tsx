import { useEffect, useRef } from "react";
import {
  Engine,
  Render,
  Bodies,
  World,
  MouseConstraint,
  Mouse,
  Composite,
  Sleeping,
  Body,
} from "matter-js";
import styles from "./Landing.module.css";
import clsx from "clsx";

const Landing = () => {
  const scene = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!scene.current) return;

    const width = scene.current.clientWidth;
    const height = scene.current.clientHeight;
    let placement = { x: 1, y: 1 };
    let spacing = { x: 300, y: 300 };

    const engine = Engine.create();
    //engine.world.gravity.y = 0.6;

    const render = Render.create({
      element: scene.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });

    function checkPlacement() {
      placement.x++;
      if (placement.x * spacing.x > width - spacing.x) {
        placement.y++;
        placement.x = 1;
      }
    }

    function addObject(object) {
      const objWidth = object.scrollWidth;
      const objHeight = object.scrollHeight;

      const rect = Bodies.rectangle(
        placement.x * spacing.y,
        placement.y * spacing.x,
        objWidth,
        objHeight,
        {
          label: object.innerText,
          density: 0.8,
          frictionAir: 0,
          restitution: 0.5,
          friction: 0.001,
          chamfer: { radius: 25 },
          render: {
            fillStyle: "transparent",
            strokeStyle: "transparent",
          },
        }
      );

      World.add(engine.world, rect);
      const rotation = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 1);
      Body.rotate(rect, rotation);
      checkPlacement();
    }

    for (const child of scene.current.children) {
      if (child.tagName !== "DIV") continue;
      addObject(child);
    }

    function mapHTML() {
      const allBodies = Composite.allBodies(engine.world);

      allBodies.forEach((body) => {
        if (body.label === "skip") return;
        for (const child of scene.current.children) {
          if (child.innerText !== body.label) continue;

          child.style.transform = `translate(${body.position.x}px, ${body.position.y}px)`;
          const baby = child.children.item(0);
          baby.style.setProperty("--rotate", `${body.angle}rad`);
        }
      });

      window.requestAnimationFrame(mapHTML);
    }

    World.add(engine.world, [
      Bodies.rectangle(width / 2, height + 250, width, 500, {
        isStatic: true,
        label: "skip",
      }),
      Bodies.rectangle(width / 2, -50, width, 100, {
        isStatic: true,
        label: "skip",
      }),
      Bodies.rectangle(-50, height / 2, 100, height, {
        isStatic: true,
        label: "skip",
      }),
      Bodies.rectangle(width + 50, height / 2, 100, height, {
        isStatic: true,
        label: "skip",
      }),
    ]);

    Engine.run(engine);
    Render.run(render);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });

    World.add(engine.world, mouseConstraint);
    render.mouse = mouse;
    window.requestAnimationFrame(mapHTML);

    return () => {
      Render.stop(render);
      World.clear(engine.world);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  return (
    <div ref={scene} className={styles.matter}>
      <div className={clsx([styles.chip, styles.green])}>
        <span>Hello world 🚀</span>
      </div>
      <div className={clsx(styles.chip, styles.lightGreen)}>
        <span>Awesome!</span>
      </div>
      <div className={clsx(styles.chip, styles.yellow)}>
        <span>Endelig</span>
      </div>
      <div className={clsx(styles.chip, styles.grey)}>
        <span>Frontend</span>
      </div>
      <div className={clsx(styles.chip, styles.purple)}>
        <span>Stort savn 💔</span>
      </div>
      <div className={clsx(styles.chip, styles.green)}>
        <span>Buzzword</span>
      </div>
      <div className={clsx(styles.chip, styles.lightGreen)}>
        <span>Nice!!</span>
      </div>
      <div className={clsx(styles.chip, styles.purple)}>
        <span>Uvirkelig</span>
      </div>
      <div className={clsx(styles.chip, styles.green)}>
        <span>Muligheter!</span>
      </div>
      <div className={clsx(styles.chip, styles.green)}>
        <span>Nyhet 🥰</span>
      </div>
    </div>
  );
};

export default Landing;
