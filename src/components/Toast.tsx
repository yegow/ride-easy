import {
  IonToast,
} from '@ionic/react'
import React, { useState, useEffect } from 'react'

import { setError, setSuccess } from '../store/actions'
import store from '../store'

const Login: React.FC<any> = ({ history }) => {
  const [visible, setShowToast] = useState(false)
  const [msg, setToastMessage] = useState('')
  const [toastColor, setToastColor] = useState('')

  useEffect(() => store.subscribe(() => {
    const { error, success } = store.getState()
    if (error) {
      setToastColor('danger')
      setToastMessage(error)
      setShowToast(true)
    } else if (success) {
      setToastColor('success')
      setToastMessage(success)
      setShowToast(true)
    }
  }))

  const onDidDismiss = () => {
    setShowToast(false)
    setToastMessage('')
    store.dispatch(setError(null))
    store.dispatch(setSuccess(null))
  }

  return (
    <IonToast
      isOpen={visible}
      onDidDismiss={onDidDismiss}
      message={msg}
      position="top"
      duration={2500}
      color={toastColor}
    />
  );
};

export default Login;
