import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import React from 'react';

export default function ToolTip({
  children,
  title,
  position,
}: {
  children: any;
  title: string;
  position: any;
}) {
  return (
    <Tooltip
      title={title}
      placement={position}
      arrow
      disableInteractive
      TransitionComponent={Zoom}
    >
      {children}
    </Tooltip>
  );
}
