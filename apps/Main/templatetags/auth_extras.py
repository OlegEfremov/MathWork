from django import template
from django.contrib.auth.models import Group
from LBBASE_v_0_40 import settings

register = template.Library()


@register.filter
def hashd(h, key):
    return h.get(key, "")


# settings value
@register.simple_tag
def settings_value(name):
    return getattr(settings, name, "")


# заиеняет заданную подстроку справа
def rreplace(inp_str, repl_str):
    pos = inp_str.rfind(repl_str)
    return inp_str[0:pos] + inp_str[pos+len(repl_str):]


@register.simple_tag
def mystatic(st_file):
    pth = getattr(settings, "PROJECT_ROOT", "")
    pth = rreplace(pth, "LBBASE_v_0_40") + "static/" + st_file
    return pth


@register.filter(name='has_group')
def has_group(user, group_name):
    group = Group.objects.get(name=group_name)
    return True if group in user.groups.all() else False


@register.filter(name='access_group')
def member_groups(user, group_name):
    if not user.is_authenticated:
        return False
    if user.is_superuser:
        return True
    if user.groups.filter(name__in=("Admins", "Superusers")).exists():
        return True

    if group_name == "Readers":
        return user.groups.filter(name__in=("Moderators", "Readers", "Editors", "Freinds")).exists()
    elif group_name == "Editors":
        return user.groups.filter(name__in=("Moderators", "Editors")).exists()
    elif group_name == "Moderators":
        return user.groups.filter(name="Moderators").exists()
    elif group_name == "Freinds":
        return user.groups.filter(name="Freinds").exists()

    return False
