import smtplib

from string import Template

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def read_template(filename):
    """
    Returns a Template object comprising the contents of the 
    file specified by filename.
    """
    
    with open(filename, 'r', encoding='utf-8') as template_file:
        template_file_content = template_file.read()
    return Template(template_file_content)

def send_message(name, email, content):
	# read contacts
	message_template = read_template('C:/Users/abars/Documents/Development/Professional_Projects/My Website/My_Website/apps/portfolio/email_template.txt')
	# set up the SMTP server
	s = smtplib.SMTP(host='smtp.gmail.com', port=587)
	s.starttls()
	s.login('abarstowtx@gmail.com', 'Oicui812')

	# For each contact, send the email:
	msg = MIMEMultipart()       # create a message

	# add in the actual person name to the message template
	message = message_template.substitute(NAME=name, EMAIL=email, MESSAGE=content)

	# Prints out the message body for our sake
	print(message)

	# setup the parameters of the message
	msg['From']='abarstowtx@gmail.com'
	msg['To']='fatbubble123@gmail.com'
	msg['Subject']="GENERATED MESSAGE"
    
	# add in the message body
	msg.attach(MIMEText(message, 'plain'))
        
	# send the message via the server set up earlier.
	s.send_message(msg)
	del msg
        
	# Terminate the SMTP session and close the connection
	s.quit()




if __name__ == '__main__':
    send_message()