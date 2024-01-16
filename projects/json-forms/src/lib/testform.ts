import { ControlType, JSONForm } from './form.model';

export const form: JSONForm = {
  controls: [
    {
      type: ControlType.Text,
      name: 'username',
      label: 'Username',
      placeholder: 'Enter username',
      validations: [
        {
          name: 'required',
          message: 'Username is required',
        },
      ],
    },
    {
      type: ControlType.Password,
      name: 'password',
      label: 'Password',
      placeholder: 'Enter password',
      validations: [
        {
          name: 'required',
          message: 'Password is required',
        },
      ],
    },
    {
      type: ControlType.Group,
      name: 'address',
      label: 'Address Details',
      controls: [
        {
          type: ControlType.Text,
          name: 'street',
          label: 'Street',
          placeholder: 'Enter street name',
        },
        {
          type: ControlType.Text,
          name: 'city',
          label: 'City',
          placeholder: 'Enter city',
        },
        {
          type: ControlType.Text,
          name: 'zip',
          label: 'ZIP Code',
          placeholder: 'Enter ZIP code',
        },
      ],
    },
    {
      type: ControlType.Select,
      name: 'gender',
      label: 'Gender',
      options: [
        {
          value: 'male',
          label: 'Male',
        },
        {
          value: 'female',
          label: 'Female',
        },
      ],
    },
    {
      type: ControlType.Select,
      name: 'country',
      label: 'Country',
      options: [
        {
          value: 'us',
          label: 'United States',
        },
        {
          value: 'ca',
          label: 'Canada',
        },
        {
          value: 'uk',
          label: 'United Kingdom',
        },
      ],
      validations: [
        {
          name: 'required',
          message: 'Country selection is required'
        },
      ],
    },
    {
      type: ControlType.Array,
      name: 'contacts',
      label: 'Contacts',
      controls: {
        type: ControlType.Group,
        name: 'contactGroup',
        label: 'Contact',
        controls: [
          {
            type: ControlType.Text,
            name: 'contactName',
            label: 'Name',
            placeholder: 'Enter contact name',
            validations: [
              {
                name: 'required',
                message: 'Name is required',
              },
            ],
          },
          {
            type: ControlType.Text,
            name: 'contactPhone',
            label: 'Phone',
            placeholder: 'Enter contact phone',
          },
        ],
      },
    },
  ],
};
