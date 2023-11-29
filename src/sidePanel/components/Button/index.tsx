import { PrimaryButton, SecondaryButton } from "./styled";
import { ButtonProps, ButtonVariants } from "./types";

const Button = ({
  children,
  disabled = false,
  onClick,
  variant,
}: ButtonProps) => {
  let Component = SecondaryButton;

  switch (variant) {
    case ButtonVariants.primary:
      Component = PrimaryButton;
      break;
    case ButtonVariants.secondary:
      Component = SecondaryButton;
      break;
  }

  return (
    <Component disabled={disabled} onClick={onClick}>
      {children}
    </Component>
  );
};

export default Button;
