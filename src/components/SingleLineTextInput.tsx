import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

interface SingleLineTextInputProps {
  label: string;
  value: string;
  handleChange: (text: string) => void;
  isDisabled?: boolean;
  errorMessage?: string;
  parentId?: string;
}

const SingleLineTextInput: React.FC<SingleLineTextInputProps> = ({
  label,
  value,
  handleChange,
  isDisabled,
  errorMessage,
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, isDisabled && styles.disabledInput]}
        value={value}
        onChangeText={handleChange}
        editable={!isDisabled}
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
    color: '#212121',
  },
  input: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#9e9e9e',
  },
  errorText: {
    marginTop: 4,
    color: '#d32f2f',
    fontSize: 14,
  },
});

export default SingleLineTextInput;
