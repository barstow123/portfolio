from django.conf.urls import url
from . import views           
urlpatterns = [
	url(r'^$', views.portfolio, name='portfolio'),
	url(r'^contact/', views.contact, name='contact'),
	url(r'^bio/', views.bio, name='bio'),
	url(r'^projects/', views.projects, name='projects'),
	url(r'^calendar/', views.calendar, name='calendar'),
	url(r'^send-email/', views.send_email, name='send_email'),
	url(r'^bogus/', views.bogus,)
] 