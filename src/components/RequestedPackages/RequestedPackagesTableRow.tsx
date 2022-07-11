import React, { memo } from "react";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

import { ConstraintSelect, VersionSelect } from "../";
import { StyledRequestedPackagesTableCell, StyledIconButton } from "src/styles";
import { requestedPackageParser } from "src/utils/helpers/requestedPackageParser";

interface IRequestedPackagesTableRowProps {
  /**
   * TODO: this interface needs a docstring for each param
   */
  requestedPackage: string;
  onRemove: (packageName: string) => void;
}

const BaseRequestedPackagesTableRow = ({
  requestedPackage,
  onRemove
}: IRequestedPackagesTableRowProps) => {
  const { name, version, constraint } =
    requestedPackageParser(requestedPackage);

  return (
    <TableRow>
      <StyledRequestedPackagesTableCell align="left">
        <Typography sx={{ fontSize: "16px", fontWeight: 400, color: "#000" }}>
          {name}
        </Typography>
      </StyledRequestedPackagesTableCell>
      <StyledRequestedPackagesTableCell align="left">
        <Typography
          sx={{ fontSize: "16px", fontWeight: 400, color: "#676666" }}
        >
          {version}
        </Typography>
      </StyledRequestedPackagesTableCell>
      <StyledRequestedPackagesTableCell align="left">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ConstraintSelect
            constraint={constraint === "latest" ? "" : constraint}
          />
          <VersionSelect version={version} />
          <StyledIconButton
            onClick={() => onRemove(requestedPackage)}
            sx={{ marginLeft: "24px" }}
          >
            <DeleteIcon />
          </StyledIconButton>
        </Box>
      </StyledRequestedPackagesTableCell>
    </TableRow>
  );
};

const compareProps = (
  prevProps: IRequestedPackagesTableRowProps,
  nextProps: IRequestedPackagesTableRowProps
) => {
  return prevProps.requestedPackage === nextProps.requestedPackage;
};

// TODO: use of memo here needs an explanatory comment
export const RequestedPackagesTableRow = memo(
  BaseRequestedPackagesTableRow,
  compareProps
);
