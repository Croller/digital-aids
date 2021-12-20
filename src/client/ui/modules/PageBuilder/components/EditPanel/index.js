// import { PALETTE } from 'client/style/base';
import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import {
  ChevronSvg,
  CopySvg,
  TrashSvg,
} from 'client/assets/images';
import {
  EditPanelWrapper,
  ControlsWrapper,
  ControlsGroup,
  Button,
  AddButton,
  AddWrapper,
  AddCompBlock,
} from './styled';

export const EditPanel = ({
  index = null,
  children,
  components = null,
  onMove = () => {},
  onCopy = () => {},
  onDelete = () => {},
  onSelect = () => {},
  // onSettings = () => {},
}) => {
  const [showControls, setShowControls] = useState(false);
  const [showAddComp, setShowAddComp] = useState(false);

  const controls = [
    // [
    //   {
    //     key: 'settings',
    //     children: <>S</>,
    //     bgcolor: PALETTE.blue,
    //     onClick: () => onSettings(),
    //   },
    // ],
    [
      {
        key: 'moveUp',
        children: <ChevronSvg />,
        onClick: () => onMove('up', index),
      },
      {
        key: 'moveDown',
        children: <ChevronSvg />,
        onClick: () => onMove('down', index),
      },
      {
        key: 'copy',
        children: <CopySvg />,
        onClick: () => onCopy(index),
      },
      {
        key: 'delete',
        children: <TrashSvg />,
        onClick: () => onDelete(index),
      },
    ],
  ];

  const handleOnSelect = (name = null) => {
    if (!name) return;
    onSelect(name, index + 1);
    setShowAddComp(false);
  };

  return (
    <EditPanelWrapper
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {children}
      {showControls && (
        <ControlsWrapper>
          {controls.map((group, g) => (
            <ControlsGroup key={`_ctrl_grp_${g + 1}`}>
              {group.map(control => (<Button {...control} name={control.key} />))}
            </ControlsGroup>
          ))}
        </ControlsWrapper>
      )}
      {components && !showAddComp ? (
        <AddButton onClick={() => setShowAddComp(true)}>
          +
        </AddButton>
      ) : (
        <OutsideClickHandler onOutsideClick={() => setShowAddComp(false)}>
          <AddWrapper>
            {components.map(({ label, name }) => (
              <AddCompBlock
                key={`_add_comp_${name}`}
                onClick={() => handleOnSelect(name)}
              >
                {label}
              </AddCompBlock>
            ))}
          </AddWrapper>
        </OutsideClickHandler>
      )}
    </EditPanelWrapper>
  );
};
