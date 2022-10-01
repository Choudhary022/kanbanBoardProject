package com.niit.userKanbanBoardService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND,reason = "Team does not exits")
public class TeamNotFoundException extends Throwable {
}
