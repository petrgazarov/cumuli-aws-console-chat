export enum ButtonVariants {
  primary = "primary",
  secondary = "secondary",
}

export type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  variant?: ButtonVariants;
};
