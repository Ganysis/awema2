interface IncircleOptions {
  color?: string;
  backgroundColor?: string;
  type?: number;
  radius?: string;
  start?: number;
  top?: string;
  left?: string;
  duration?: number;
}

function extendDefaults<T>(source: T, properties: Partial<T>): T {
  let result = {} as T;
  for (let property in source) {
    if ((source as any).hasOwnProperty(property)) {
      result[property] = source[property];
    }
  }
  for (let property in properties) {
    if (properties.hasOwnProperty(property)) {
      (result as any)[property] = properties[property] as T[keyof T];
    }
  }
  return result;
}

function incircle(selector: string, options: IncircleOptions): void {
  let elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
  if (!elements || elements.length === 0) {
    return;
  }

  let defaults: IncircleOptions = {
    color: "#556b2f",
    backgroundColor: "white",
    type: 1,
    radius: "12em",
    start: -90,
    top: "50%",
    left: "0px",
    duration: 1500,
  };

  let settings = extendDefaults<IncircleOptions>(defaults, options);

  elements.forEach(function (element) {
    if (!element) return;
    element.style.position = "relative";
    element.style.top = settings.top || "0px";
    element.style.left = settings.left || "0px";
    element.style.listStyleType = "none";
    element.style.margin = "0";
    element.style.padding = "0";

    var childElements = Array.from(element.children).filter(
      function (_, index) {
        return settings.type === 1 || index > 0;
      },
    ) as HTMLElement[];

    var numberOfElements =
      settings.type === 1 ? childElements.length - 1 : childElements.length - 1;
    var slice = (360 * settings.type!) / numberOfElements;

    childElements.forEach(function (child, i) {
      if (i === 0 || !child) {
        return;
      }

      var rotate = slice * i + settings.start!;
      var rotateReverse = rotate * -1;

      child.style.position = "absolute";
      child.style.transition = `transform ${settings.duration}ms ease-in-out`;
      child.style.transform =
        "rotate(" +
        rotate +
        "deg) translate(" +
        settings.radius +
        ") rotate(" +
        rotateReverse +
        "deg)";
    });
  });
}

export function incircleInit() {
  const elements = document.querySelector(".in-circle");
  if (!elements) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          incircle(".in-circle", {
            type: 1,
            radius: "13em",
            start: 0,
          });
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.6,
    },
  );

  observer.observe(elements);
}
