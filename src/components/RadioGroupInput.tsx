import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface RadioGroupInputProps {
  label: string;
  value: string;
  handleChange: (value: string) => void;
  isDisabled?: boolean;
  errorMessage?: string;
  items: string[];
}

const RadioGroupInput: React.FC<RadioGroupInputProps> = ({
  label,
  value,
  handleChange,
  isDisabled,
  errorMessage,
  items,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.radioItem,
            value === item && styles.selectedItem,
            isDisabled && styles.disabledItem,
          ]}
          onPress={() => !isDisabled && handleChange(item)}
          disabled={isDisabled}>
          <View
            style={[
              styles.radioCircle,
              value === item && styles.selectedCircle,
            ]}
          />
          <Text style={[styles.radioLabel, isDisabled && styles.disabledLabel]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fafafa',
  },
  label: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: '600',
    color: '#333',
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 6,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  radioCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#bbb',
    marginRight: 12,
  },
  selectedCircle: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
  selectedItem: {
    backgroundColor: '#e8f5e9',
  },
  disabledItem: {
    opacity: 0.5,
  },
  disabledLabel: {
    color: '#aaa',
  },
  errorText: {
    marginTop: 8,
    color: '#e53935',
    fontSize: 14,
  },
});

export default RadioGroupInput;
