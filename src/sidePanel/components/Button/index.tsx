import { PrimaryButton, SecondaryButton } from "./styled";
import { ButtonProps, ButtonVariants } from "./types";

export { ButtonBase, PrimaryButton, SecondaryButton } from "./styled";

export const Button = ({
  children,
  disabled = false,
  onClick,
  style,
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
    <Component disabled={disabled} onClick={onClick} style={style}>
      {children}
    </Component>
  );
};
