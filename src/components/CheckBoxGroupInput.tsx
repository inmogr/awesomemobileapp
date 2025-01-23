import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface CheckBoxGroupInputProps {
  label: string;
  values: string[];
  handleChange: (selectedValues: string[]) => void;
  isDisabled?: boolean;
  errorMessage?: string;
  parentId?: string;
  items: string[];
}

const CheckBoxGroupInput: React.FC<CheckBoxGroupInputProps> = ({
  label,
  values,
  handleChange,
  isDisabled,
  errorMessage,
  items,
}) => {
  const toggleValue = (item: string) => {
    if (values.includes(item)) {
      handleChange(values.filter(value => value !== item));
    } else {
      handleChange([...values, item]);
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.checkboxItem, isDisabled && styles.disabledItem]}
          onPress={() => !isDisabled && toggleValue(item)}
          disabled={isDisabled}>
          <View
            style={[
              styles.checkbox,
              values.includes(item) && styles.checkedBox,
            ]}
          />
          <Text
            style={[styles.checkboxLabel, isDisabled && styles.disabledLabel]}>
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
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 6,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: '#bbb',
    marginRight: 12,
  },
  checkedBox: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
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

export default CheckBoxGroupInput;
