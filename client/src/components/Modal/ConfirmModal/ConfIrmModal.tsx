'use client'

import React, { useState } from 'react'

import { Modal } from '../style'
import { Options } from '.'
import { Button } from '@/components/Button/Button'


type ModalProps = {
  message: string
  resolver: (decision: boolean) => void
  options?: Options
}

export const ConfirmModal: React.FC<ModalProps> = ({
  resolver,
  message,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(true)

  const onConfirm = () => {
    setIsOpen(false)
    resolver(true)
  }
  const onCancel = () => {
    setIsOpen(false)
    resolver(false)
  }

  return isOpen ? (
    <Modal>
      <Modal.Background role="confirm-modal">
        <Modal.Container size="small">
          <Modal.Header>
            <Modal.Title>{message}</Modal.Title>
            <Modal.CloseButton onClick={() => onCancel()} />
          </Modal.Header>
          <Modal.Body>{options?.children}</Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              onClick={onCancel}
              color="red"
              className="mr-2"
            >
              취소
            </Button>
            <Button type="button" onClick={onConfirm} color="blue">
              확인
            </Button>
          </Modal.Footer>
        </Modal.Container>
      </Modal.Background>
      <Modal.BackArea />
    </Modal>
  ) : null
}