import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast backdrop-blur-xl bg-white/70 text-foreground border border-white/40 shadow-2xl dark:bg-slate-900/70 dark:border-white/10",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary/90 group-[.toast]:text-primary-foreground group-[.toast]:shadow",
          cancelButton:
            "group-[.toast]:bg-white/70 group-[.toast]:text-muted-foreground group-[.toast]:border group-[.toast]:border-white/40",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
