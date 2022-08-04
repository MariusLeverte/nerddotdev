import clsx from "clsx";
import { ReactNode, useRef, useState } from "react";
import Text from "../../atoms/Text/Text";

export interface CollapseProps {
  title: string;
  children: ReactNode;
  open?: boolean;
}

const Collapse = ({ title, children, open }: CollapseProps) => {
  const ref = useRef<any>();
  const [isOpen, setOpen] = useState(open ?? false);

  const id = title?.replace(" ", "-").toLowerCase() ?? "foo";

  return (
    <div data-accordion="collapse" className="border-b">
      <Text as="h3" className="text-2xl py-4" weight="bold" id={`${id}-title`}>
        <button
          type="button"
          data-accordion-target={`#${id}-body`}
          aria-expanded={isOpen}
          aria-controls={`${id}-body`}
          onClick={() => setOpen(!isOpen)}
          className="w-full flex items-center justify-between"
        >
          <span>{title}</span>
          <svg
            data-accordion-icon
            className={clsx(
              "w-6 h-6 shrink-0 transition-transform opacity-60",
              {
                "rotate-0": isOpen,
                "rotate-90": !isOpen,
              }
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </Text>
      <div
        aria-labelledby={`#${id}-title`}
        id={`${id}-body`}
        className={clsx("transition-[height] duration-200 overflow-hidden")}
        style={{ height: isOpen ? ref.current?.offsetHeight : 0 }}
      >
        <div
          className={clsx("transition-opacity duration-300 pb-4", {
            "opacity-0": !isOpen,
            "opacity-100": isOpen,
          })}
          ref={ref}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Collapse;
