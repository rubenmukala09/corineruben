import { ReactNode } from "react";
import { Button, ButtonProps } from "@/components/ui/button";

interface AnimatedButtonProps extends ButtonProps {
  children: ReactNode;
  withRipple?: boolean;
}

const AnimatedButton = ({
  children,
  withRipple = true,
  ...props
}: AnimatedButtonProps) => {
  return (
    <div className="hover-scale active:scale-95 transition-transform">
      <Button className="relative overflow-hidden" {...props}>
        {children}
      </Button>
    </div>
  );
};

export default AnimatedButton;
