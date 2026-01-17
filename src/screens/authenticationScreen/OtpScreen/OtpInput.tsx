import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  ViewStyle,
  TextInputKeyPressEventData,
  NativeSyntheticEvent,
} from "react-native";
import { Colors } from "../../../utils/styles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


type Props = {
  length?: number;
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
  autoFocus?: boolean;
  boxSize?: number;
  boxStyle?: ViewStyle;
  containerStyle?: ViewStyle;
};

const  OtpInput:React.FC<Props> = ({
  length = 6,
  onChange,
  onComplete,
  autoFocus = true,
  boxSize = 40,
  boxStyle,
  containerStyle,
}) =>{
  const [values, setValues] = useState<string[]>(() => Array(length).fill(""));
  const inputs = useRef<Array<TextInput | null>>([]);
  const mounted = useRef(false);

  // Keep refs array length in sync with `length`
  if (inputs.current.length !== length) {
    inputs.current = Array.from({ length }).map((_, i) => inputs.current[i] ?? null);
  }

  // Reset values if length changes
  useEffect(() => {
    setValues(Array(length).fill(""));
  }, [length]);

  useEffect(() => {
    // focus first input on mount if requested
    if (autoFocus) {
      const firstEmpty = values.findIndex((v) => !v);
      const idx = firstEmpty === -1 ? length - 1 : firstEmpty;
      // Delay slightly to ensure RN input ready
      setTimeout(() => {
        inputs.current[idx]?.focus?.();
      }, 100);
    }
    mounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const code = values.join("");
    onChange && onChange(code);
    if (/^\d+$/.test(code) && code.length === length) {
      onComplete && onComplete(code);
    }
  }, [values, length, onChange, onComplete]);

  const isDigit = (ch: string) => /\d/.test(ch);

  const handleChangeText = (text: string, idx: number) => {
    if (!text) {
      // cleared the box
      setValues((prev) => {
        const cp = [...prev];
        cp[idx] = "";
        return cp;
      });
      return;
    }

    // If user pasted multiple characters (or keyboard autofill), distribute digits starting at idx
    const digits = text.split("").filter(isDigit);
    if (digits.length === 0) return;

    setValues((prev) => {
      const cp = [...prev];
      for (let i = 0; i < digits.length && idx + i < length; i++) {
        cp[idx + i] = digits[i];
      }
      return cp;
    });

    // Move focus to the next position after the inserted block
    const nextIndex = Math.min(idx + digits.length, length - 1);
    setTimeout(() => {
      inputs.current[nextIndex]?.focus?.();
      // Note: selecting text in RN TextInput programmatically requires passing selection prop and controlled component behavior.
    }, 50);
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    idx: number
  ) => {
    // Backspace handling: if current is empty, move to previous and clear it
    if (e.nativeEvent.key === "Backspace") {
      if (values[idx] === "" && idx > 0) {
        setValues((prev) => {
          const cp = [...prev];
          cp[idx - 1] = "";
          return cp;
        });
        setTimeout(() => inputs.current[idx - 1]?.focus?.(), 50);
      } else {
        // Let clearing current value be handled by onChangeText (user deletes)
      }
    }
  };

  const handleBoxPress = (idx: number) => {
    inputs.current[idx]?.focus?.();
  };

  return (
    <View style={[styles.row, containerStyle]}>
      {Array.from({ length }).map((_, i) => (
        <TouchableWithoutFeedback key={i} onPress={() => handleBoxPress(i)}>
          <View
            style={[
              styles.box,
              {
                width: boxSize,
                height: boxSize,
                borderRadius: Math.round(boxSize * 0.18), // similar rounded square
              },
              boxStyle,
            ]}
            accessible={false}
          >
            <TextInput
              // Using callback ref to keep the refs array up to date
              ref={(ref) => {
                inputs.current[i] = ref;
              }}
              value={values[i]}
              onChangeText={(text) => handleChangeText(text, i)}
              onKeyPress={(e) => handleKeyPress(e, i)}
              keyboardType={Platform.select({
                ios: "number-pad",
                android: "numeric",
              }) as any}
              returnKeyType="done"
              // iOS one-time-code autofill
              textContentType={Platform.OS === "ios" ? ("oneTimeCode" as any) : undefined}
              // Android SMS OTP autocomplete (may vary by RN version); cast to any to avoid strict typings
              autoComplete={Platform.OS === "android" ? ("sms-otp" as any) : undefined}
              maxLength={1} // still allow paste of multiple via onChangeText on some platforms; behavior may vary
              style={[styles.input, { fontSize: Math.round(boxSize * 0.4) }]}
              selectionColor="transparent"
              accessible={true}
              accessibilityLabel={`Digit ${i + 1} of ${length}`}
              caretHidden={true}
            />
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

export default OtpInput
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
   
  },
  box: {
    borderWidth: 1.2,
    borderColor: "#cfcfcf",
    backgroundColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 6, // fallback spacing if gap isn't supported
  },
  input: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    color: Colors.border,
    padding: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});