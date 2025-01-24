import React from 'react';
import {useFormContext} from 'react-hook-form';
import {localStorage} from '../utilities/localStorage';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {isObjectEmpty} from '../utilities/isObjectEmpty';
import axios from 'axios';

export const SaveAndSubmitForm: React.FC = () => {
  const form = useFormContext();
  const isDisabled =
    !isObjectEmpty(form.formState.errors) ||
    !form.formState.isDirty ||
    !form.formState.isValid;

  //
  //
  //

  const onPress = async () => {
    const values = form.getValues();
    try {
      const res = await axios.post('http://localhost:8080/hello-world', { ...values });
      if (res.data) {
        // as long as data returned successfully this means requested didn't crash and it means it was successful and it means we can deleted local data
        // for now i'm clearing all, in real case we will remove form field names only
        localStorage.clearAll();
        setTimeout(() => {
          form.reset();
        }, 100);
      }
    } catch (error) {
      // Test it at your own convenience
      // localStorage.clearAll();
      // setTimeout(() => {
      //   form.reset();
      // }, 100);
      // TODO
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <Pressable
          style={[styles.button, isDisabled && styles.disabledButton]}
          onPress={onPress}
          disabled={isDisabled}>
          <Text
            style={[
              styles.buttonText,
              isDisabled && styles.disabledButtonText,
            ]}>
            Submit
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#4caf50',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#bdbdbd',
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '600',
  },
  disabledButtonText: {
    color: '#9e9e9e',
  },
});
