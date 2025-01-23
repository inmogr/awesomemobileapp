import React from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
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

  const form = useForm({defaultValues: STORED_FROM_LAST_SESSION});

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{paddingHorizontal: 16}}>
        <FormProvider {...form}>
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

          <SaveAndSubmitForm />
        </FormProvider>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
