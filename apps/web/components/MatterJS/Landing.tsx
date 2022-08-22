import { useEffect, useRef } from "react";
import {
  Engine,
  Render,
  Bodies,
  World,
  MouseConstraint,
  Mouse,
  Composite,
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
    let placement = { x: 20, y: 20 };
    let spacing = { x: 20, y: 20 };

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

    function getPlacement(x, y) {
      placement.x = x + spacing.x;

      if (placement.x > width - spacing.x) {
        placement.y = y + spacing.y;
        placement.x = 20;
      }
      if (placement.y > height - spacing.y) {
        placement.y = 20;
      }

      return { x: placement.x, y: placement.y };
    }

    function addObject(object) {
      const objWidth = object.scrollWidth;
      const objHeight = object.scrollHeight;

      const { x, y } = getPlacement(
        placement.x + objWidth,
        placement.y + objHeight
      );

      const rect = Bodies.rectangle(x, y, objWidth, objHeight, {
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
      });

      World.add(engine.world, rect);
      const rotation = (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 1);
      Body.rotate(rect, rotation);
    }

    for (const child of scene.current.children) {
      if (child.tagName !== "DIV") continue;
      addObject(child);
    }

    function mapHTML() {
      const allBodies = Composite.allBodies(engine.world);

      allBodies.forEach((body) => {
        if (body.label === "skip") return;
        if (!scene.current) return;
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

  const colors = ["green", "lightGreen", "yellow", "grey", "purple"];
  const words = [
    "Hello world 🚀",
    "Awesome!",
    "Endelig",
    "Frontend",
    "Uvirkelig 😱",
    "Muligheter!",
    "Nyhet 🥰",
    "Lær mer / del kunnskap",
    "Sparre",
    "Backet av miljø 🤩",
  ];

  return (
    <div ref={scene} className={styles.matter}>
      {words.map((word, i) => (
        <div
          className={clsx(
            styles.chip,
            styles[colors[i < colors.length ? i : i - colors.length]]
          )}
          key={i}
        >
          <span>{word}</span>
        </div>
      ))}
    </div>
  );
};

export default Landing;
