import React from 'react';
import {useFormContext} from 'react-hook-form';
import {
  localStorage,
  localStorageGetObject,
  localStorageSetObject,
} from '../utilities/localStorage';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {isObjectEmpty} from '../utilities/isObjectEmpty';

export const SAVE_KEY = 'ABCD_FORM';
export const STORED_FROM_LAST_SESSION = localStorageGetObject(SAVE_KEY);

export const SaveAndSubmitForm: React.FC = () => {
  const form = useFormContext();
  const isDirty = !!STORED_FROM_LAST_SESSION || form.formState.isDirty;
  const isDisabled =
    !isObjectEmpty(form.formState.errors) ||
    !isDirty ||
    !form.formState.isValid;

  //
  //
  //

  const watched = form.watch();
  React.useMemo(() => {
    localStorageSetObject(SAVE_KEY, watched);
  }, [watched]);

  //
  //
  //

  const onPress = async () => {
    console.log('watched', watched);
    localStorage.clearAll();
    form.reset();
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
