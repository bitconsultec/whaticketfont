import React, { useState } from "react";
import { i18n } from "../../translate/i18n";
import { Avatar, CardHeader, Grid, TextField, Input, InputAdornment, InputLabel, Typography, } from "@material-ui/core";
import { TagsKanbanContainer } from "../TagsKanbanContainer";
import { Stack } from "@mui/material";
import TicketActionButtonsCustom from "../TicketActionButtonsCustom";
import { useScreenSize } from "../../utils/useScreenSize";




const TicketInfo = ({ contact, ticket, onClick }) => {
	const [amount, setAmount] = useState("");

	const screenSize = useScreenSize();


	const renderCardReader = () => {
		return (
			<CardHeader
				onClick={onClick}
				style={{ cursor: "pointer" }}
				titleTypographyProps={{ noWrap: true }}
				subheaderTypographyProps={{ noWrap: true }}
				avatar={<Avatar src={contact?.urlPicture} alt="contact_image" />}
				title={
					<Stack direction="row" spacing={1} alignItems="center">

						<Typography variant="body1" color="textPrimary">
							{contact?.name || '(sem contato)'} #{ticket.id}
						</Typography>

						{/* aparecer somente quando estiver na tela sm */}
						{screenSize == 'sm' || screenSize == 'xs' ?
							(
								<Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
									{ticket.user && `${i18n.t("messagesList.header.assignedTo")} ${ticket.user.name}`}
								</Typography>
							)
							:
							null

						}
					</Stack>}

				subheader={<>
					{screenSize != 'sm' && screenSize != 'xs' ?

						(
							ticket.user && `${i18n.t("messagesList.header.assignedTo")} ${ticket.user.name}`
						)

						:

						(
							<TicketActionButtonsCustom
								ticket={ticket}
							/>
						)

					}

					{/* aparecer somente quando estiver na tela sm */}

				</>
				}


			/>
		);
	}

	const handleChange = (event) => {
		const value = event.target.value;

		setAmount(value);
	}


	return (
		<React.Fragment>
			<Grid container alignItems="center" spacing={10}>
				{/* Conteúdo do contato à esquerda */}
				<Grid item xs={6}>
					{renderCardReader()}

				</Grid>
			</Grid>
		</React.Fragment>
	);
};

export default TicketInfo;
