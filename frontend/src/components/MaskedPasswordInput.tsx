import { useMemo, useRef, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";

type Props = Omit<React.ComponentProps<typeof Form.Control>, "value" | "onChange"> & {
  value: string;
  onValueChange: (value: string) => void;
};

export default function MaskedPasswordInput({
  value,
  onValueChange,
  ...props
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const displayValue = useMemo(() => {
    return showPassword ? value : "•".repeat(value.length);
  }, [value, showPassword]);

  const apply = (next: string) => {
    onValueChange(next.replace(/\s+/g, ""));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      e.preventDefault();
      return;
    }

    const el = e.currentTarget;
    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;

    if (e.key === "Backspace") {
      e.preventDefault();
      if (start !== end) {
        apply(value.slice(0, start) + value.slice(end));
      } else if (start > 0) {
        apply(value.slice(0, start - 1) + value.slice(start));
        requestAnimationFrame(() =>
          el.setSelectionRange(start - 1, start - 1)
        );
      }
      return;
    }

    if (e.key === "Delete") {
      e.preventDefault();
      if (start !== end) {
        apply(value.slice(0, start) + value.slice(end));
      } else if (start < value.length) {
        apply(value.slice(0, start) + value.slice(start + 1));
        requestAnimationFrame(() =>
          el.setSelectionRange(start, start)
        );
      }
      return;
    }

    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const navKeys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Tab",
      "Home",
      "End",
      "Enter",
      "Escape",
    ];
    if (navKeys.includes(e.key)) return;

    if (e.key.length === 1) {
      e.preventDefault();
      const next = value.slice(0, start) + e.key + value.slice(end);
      apply(next);
      requestAnimationFrame(() => {
        const pos = start + 1;
        el.setSelectionRange(pos, pos);
      });
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text") ?? "";
    const clean = text.replace(/\s+/g, "");

    const el = e.currentTarget;
    const start = el.selectionStart ?? value.length;
    const end = el.selectionEnd ?? value.length;

    apply(value.slice(0, start) + clean + value.slice(end));
    requestAnimationFrame(() => {
      const pos = start + clean.length;
      el.setSelectionRange(pos, pos);
    });
  };

  return (
    <InputGroup>
      <Form.Control
        ref={inputRef}
        type="text"
        value={displayValue}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        autoComplete="off"
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect="off"
        inputMode="text"
        {...props}
      />

      <Button
        variant="outline-secondary"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        <FeatherIcon icon={showPassword ? "eye-off" : "eye"} size={16} />
      </Button>
    </InputGroup>
  );
}