import { Fragment } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Container } from "ui";
import imageos from "/public/images/42_Dashboard_2.png";

interface LandingHeroImageProps {
  topSectionColor?: string;
  bottomSectionColor?: string;
}

export const LandingHeroImage = ({
  topSectionColor,
  bottomSectionColor = "bg-transparent",
}: LandingHeroImageProps) => {
  return (
    <section>
      <div className={clsx(topSectionColor)}>
        <Container className="h-[300px] lg:h-[780px] relative -mt-20 lg:-mt-52 translate-y-20 lg:translate-y-52 shadow-slate-900">
          <Image src={imageos} alt="test" layout="fill" objectFit="fill" />
        </Container>
      </div>
      <div className={clsx(bottomSectionColor, "h-32 lg:h-64")} />
    </section>
  );
};
