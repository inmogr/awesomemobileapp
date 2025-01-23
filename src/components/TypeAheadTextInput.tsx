import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface TypeAheadTextInputProps {
  label: string;
  value: string;
  handleChange: (text: string) => void;
  isDisabled?: boolean;
  errorMessage?: string;
  suggestions: string[];
}

const TypeAheadTextInput: React.FC<TypeAheadTextInputProps> = ({
  label,
  value,
  handleChange,
  isDisabled,
  errorMessage,
  suggestions,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const handleInputChange = (text: string) => {
    handleChange(text);
    if (text.trim() === '') {
      setFilteredSuggestions([]);
      setIsDropdownVisible(false);
    } else {
      const filtered = suggestions.filter(item =>
        item.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredSuggestions(filtered);
      setIsDropdownVisible(true);
    }
  };

  const handleSelect = (item: string) => {
    handleChange(item);
    setFilteredSuggestions([]);
    setIsDropdownVisible(false);
  };

  const onBlur = () => {
    if (filteredSuggestions.length) {
      handleSelect(filteredSuggestions[0]);
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, isDisabled && styles.disabledInput]}
        value={value}
        onChangeText={handleInputChange}
        editable={!isDisabled}
        onBlur={onBlur}
      />
      {isDropdownVisible && (
        <FlatList
          style={styles.dropdown}
          data={filteredSuggestions}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleSelect(item)}>
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
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
  input: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#ffffff',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#9e9e9e',
  },
  dropdown: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#bdbdbd',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    maxHeight: 150,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    marginTop: 8,
    color: '#e53935',
    fontSize: 14,
  },
});

export default TypeAheadTextInput;
