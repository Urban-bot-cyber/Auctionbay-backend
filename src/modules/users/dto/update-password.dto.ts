import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Match } from 'src/decorators/match.decorator';

export class UpdatePasswordDto {
    @ApiProperty({ required: false })
    @IsNotEmpty()
    currentPassword: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @Matches(/^(?=.*\d)[A-Za-z.\s_-]+[\w~@#$%^&*+=`|{}:;!.?"()[\]-]{6,}/, {
        message:
            'Password must have at least one number, lower or upper case letter and it has to be longer than 5 characters.',
    })
    newPassword: string;

    @ApiProperty({ required: false })
    @IsNotEmpty()
    @Match(UpdatePasswordDto, (field) => field.newPassword, {message: 'Passwords do not match.' })
    confirmPassword: string;
}