import React from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import FormData from './src/constants/FormData.json';
import {FormType} from './src/types/FormTypes';
import {FormProvider, useForm} from 'react-hook-form';
import {
  SaveAndSubmitForm,
  STORED_FROM_LAST_SESSION,
} from './src/containers/SaveAndSubmitForm';
import {FormSection} from './src/containers/FormSection';

function App(): React.JSX.Element {
  const formData: FormType = FormData;
  const formDataSectionNames = Object.keys(formData);

  const form = useForm({defaultValues: STORED_FROM_LAST_SESSION, shouldUnregister: true});

  return (
    <FormProvider {...form}>
      <SafeAreaView>
        <StatusBar barStyle="dark-content" />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={{paddingHorizontal: 16}}>
          {formDataSectionNames.map(formSectionName => {
            const formSection = formData[formSectionName];

            return (
              <FormSection
                key={formSectionName}
                parentId={formSectionName}
                propertyNames={Object.keys(formSection.properties)}
                properties={formSection.properties}
              />
            );
          })}

          <View style={{ height: 48 }} />
        </ScrollView>
        <SaveAndSubmitForm />
      </SafeAreaView>
    </FormProvider>
  );
}

export default App;
