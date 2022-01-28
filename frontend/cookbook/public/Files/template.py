# import re

#Example Snippets:
#=================
# here data as string like Source code
# def xml_extract_3(data):
#     insert_data = re.findall(r'\binsert into\b.*?;',data,flags=re.I | re.DOTALL)
#     for ins in insert_data:
#         old_data=ins
#         if ("EXTRACT" in ins) and ('VALUES' in ins) and (';' in ins):
#             ins = re.sub(r'values\s+\(','values(',ins,flags=re.I)
#             ins=ins.replace('extract','EXTRACT').replace('values','VALUES').replace('getnumberval','GETNUMBERVAL').replace('getstringval','GETSTRINGVAL').replace('to_date','TO_DATE')
#             values_data = re.findall(r'\bvalues\((.*?)\);',ins,flags=re.I | re.DOTALL)
#             comma_split=split_main(values_data[0])
#             for sp in comma_split:
#                 if ("EXTRACT" in sp) and ("TO_DATE" not in sp):
#                     a = re.findall(r'(.*?)\.',sp,flags=re.I | re.DOTALL)[0].strip()
#                     b = re.findall(r'\(\'(.*?)\'\)',sp,flags=re.I | re.DOTALL)[0].strip()
#                     if ".GETNUMBERVAL()" in sp:
#                         statement ='\n' + "(UNNEST(XPATH('" + b + "'," + a + ")))" + "::VARCHAR::NUMERIC"
#                         ins = ins.replace(sp,statement)
#                         # data = data.replace(ins,ins_data)
#                     if ".GETSTRINGVAL()" in sp:
#                         statement ='\n' +  "(UNNEST(XPATH('" + b + "'," + a + ")))" + "::VARCHAR"
#                         ins = ins.replace(sp, statement)
#                         # data = data.replace(ins, ins_data)
#                 if ("EXTRACT" in sp) and ("TO_DATE" in sp):
#                     a = re.findall(r'\((.*?)\.', sp, flags=re.I | re.DOTALL)[0].strip()
#                     # print(a)
#                     b = re.findall(r'\(\'(.*?)\'\)', sp, flags=re.I | re.DOTALL)[0].strip()
#                     if ".GETSTRINGVAL()" in sp:
#                         statement ='\n' + "TO_DATE(UNNEST(XPATH('" + b + "'," + a + "))'dd-mm-yyyy HH24:MI:SS'))" + "::text::date"
#                         # print(statement)
#                         ins = ins.replace(sp, statement)
#                         # data = data.replace(ins, ins_data)
#         data=data.replace(old_data,ins)
#    # print(data)

#    # return data



#Example Snippet:
#===============
# import re
# def xml_extration(data):  # Assigned by Vijayalakshmi on 6-12-2021     XmlExtraction Versionv1
#     data = re.sub(r' +', ' ', data)
#     data = re.sub(r'xmltype', 'xml', data, flags=re.I | re.DOTALL)
#     data = re.sub(r'\bEXTRACT\s+\(', 'extract(', data, flags=re.I | re.DOTALL)
#     data = re.sub(r'\bTABLE\s+\(', 'table(', data, flags=re.I | re.DOTALL)
#     data = re.sub(r'\bEXTRACTVALUE\s+\(', 'extractvalue(', data, flags=re.I | re.DOTALL)
#     data = re.sub(r'\:\=', ' := ', data, flags=re.I | re.DOTALL)
#     data = re.sub(r'=', ' = ', data, flags=re.I | re.DOTALL)
#     data = re.sub(r'\:\s+\=', ' := ', data, flags=re.I | re.DOTALL)
#     # data = extractscenario(data, 'extract')
#     # data = extractscenario(data, 'extractvalue')
#     data = re.sub(r'\(\s+xmlsequence', '(xmlsequence', data, flags=re.I | re.DOTALL)
#     data = re.sub(r"'\s+\)", "')", data)
#     data = re.sub(r"\bfrom\b\s+table\(", "from table(", data, flags=re.I | re.DOTALL)
#     data = re.sub(r"\)", ") ", data, flags=re.I | re.DOTALL)
#     modified_data = re.findall(r'\binsert into\b.*?;', data, flags=re.I | re.DOTALL)
#     for ll in modified_data:
#         if ('select ' and 'from table(xmlsequence') in ll:
#             mod_select_string = ll
#             select_stmnt = re.findall(r'\bselect\b.*?from table\(xmlsequence', ll, flags=re.I | re.DOTALL)
#             comma_split = split_main(select_stmnt[0])
#             comma_main = []
#             count = 0
#             for i in comma_split:
#                 if 'from table(xmlsequence' not in i:
#                     rep = i + ' as "alias{0}", '.format(count)
#                     comma_main.append(rep)
#                     count = count + 1
#                 else:
#                     comma_main.append(i)
#             comma_main = ''.join(comma_main).replace('from table(xmlsequence',
#                                                      ' as "alias' + str(count) + '" from table(xmlsequence', 1)
#             mod_select_string = mod_select_string.replace(select_stmnt[0], comma_main)
#             xml_sequence_data = re.findall(r'\bxmlsequence\(extract\(.*?\'\)', mod_select_string,
#                                            flags=re.I | re.DOTALL)
#             for zmr in xml_sequence_data:
#                 if ',' in zmr:
#                     mid_split_data = zmr.split(',')
#                     a = mid_split_data[1].rsplit(')', 1)[0]
#                     b = mid_split_data[0]
#                     b = re.sub(r'\bxmlsequence\(extract\(', '', b, flags=re.I | re.DOTALL)
#                     adding_select_stmnt = "select unnest (xpath (" + a + ',' + b + ")) as value " + 'removingasvaluesextrabracket'
#                     zmr_data = zmr.replace(zmr, adding_select_stmnt)
#                     mod_select_string = mod_select_string.replace(zmr, zmr_data)
#             mod_select_string = re.sub(r'\bremovingasvaluesextrabracket\s+\)', '', mod_select_string)
#             extract_data = re.findall(r'\bextract\b\(.*?\'\)', mod_select_string, flags=re.I | re.DOTALL)
#             extractvalue_data = re.findall(r'\bextractvalue\b\(.*?\'\)', mod_select_string, flags=re.I | re.DOTALL)
#             all_extract_data = extract_data + extractvalue_data
#             for i in all_extract_data:
#                 try:
#                     var2 = i.split(',')[1].rsplit(')')[0]
#                     adding_select_stmnt = "(select unnest(xpath(" + var2 + ',l1i.value'")))"
#                     mod_select_string = mod_select_string.replace(i, adding_select_stmnt)
#                 except IndexError:
#                     print('new case')
#             removing_dotdata = re.findall(r',l1i.value\)\)\)(.*?)\sas\s"', mod_select_string, re.DOTALL)
#             for cs in removing_dotdata:
#                 if '.' in cs:
#                     cs = cs.replace(' )', ')').replace('))', ')')  # changes done on 23-12-2021
#                     mod_select_string = mod_select_string.replace(cs, '')
#             mod_select_string = re.sub(r'\bselect\b', 'select res.* from ( select', mod_select_string, 1, re.I)
#             mod_select_string = re.sub(r'\bfrom\b\stable\(', 'from ( with ctc as(', mod_select_string)
#             last_value = mod_select_string.rsplit(')')[-1].strip()
#             mod_select_string = re.sub(rf'{last_value}', 'select value from ctc) l1i ) res;', mod_select_string,
#                                        re.DOTALL)
#             data = data.replace(ll, mod_select_string)
#     return data

# Example Snippets
#=================

# def declare_begin_data(collection_string):
#     ''' Taking data between declare and begin and collecting variables and tablename'''
#     dec_begin = re.findall(r'\bdeclare\b.*?\bbegin\b', collection_string, flags=re.DOTALL | re.I)
#     data_varibles_1 = []
#     data_varibles_2 = []
#     store_before_val = []
#     dict_format = {}
#     dict_format2 ={}
#     for db in dec_begin:
#         oldstring = db
#         newstring = db
#         if 'type' in db:
#             ty_colon = re.findall(r'\btype\s.*?;', db, flags=re.DOTALL | re.I)
#             for ty in ty_colon:
#                 if ('is table of ' and '%rowtype index by ') in ty:
#                     ty_istab1 = re.findall(r'\btype\s(.*?)\bis table of\s', ty, flags=re.DOTALL | re.I)[0].strip()
#                     # new changes
#                     is_rowtype = re.findall(r'\bis table of\s(.*?)%rowtype index by\s', ty, flags=re.DOTALL | re.I)[
#                         0].strip()#removed \b before %rowtype by cs  25/01
#                     # end new changes
#                     ty_colon_comment = '--' + ty #removed comments by cs 25/01
#                     newstring = newstring.replace(ty, ty_colon_comment)
#                     data_varibles_1.append(ty_istab1)
#                     data_varibles_2.append(is_rowtype)
#                     dict_format[ty_istab1] = is_rowtype
#
#         for data_var in data_varibles_1:
#             taking_data_var = re.findall(rf'\S+\s+\b{data_var}\b;', db, re.DOTALL)[0]
#             data_comm_var = '\n--' + taking_data_var  #removed comments by cs 25/01
#             newstring = newstring.replace(taking_data_var, data_comm_var)
#             taking_data_var_1 = taking_data_var.split()[0]
#             taking_data_var_2 = taking_data_var.split()[1][:-1]
#             for key,value in dict_format.items():
#                 if str(key) == str(taking_data_var_2).strip():
#                     dict_format2[taking_data_var_1] = value
#             store_before_val.append(taking_data_var_1)
#         collection_string = collection_string.replace(oldstring, newstring)
#     unique_types = list(set(store_before_val))
#     return collection_string, data_varibles_2, unique_types,dict_format2
#

# def reading_storage_sheet(unique_data_varibles_2, unique_column_names, cschema_type):
#     '''Reading storage excel sheet('DataTypeMapping_Matched', 'DataTypeMapping_Not Matched') and
#        reading 'postgres_tab_name', 'postgres_column_name', 'postgres_datatype', 'CHARACTER_MAXIMUM_LENGTH' Column
#        and fetching datatype and length
#      '''
#     data_excels_storing = []
#     try:
#         sql_path_data = db_transit_path + '/' + str(cschema_type).upper() + '/' + 'EXCEL' + '/' + 'PHARMACY_STORAGEOBJECTS_validation.xlsx'
#         data_with_column_names = pd.read_excel(sql_path_data,
#                                                sheet_name=['DataTypeMapping_Matched', 'DataTypeMapping_Not Matched'])
#         sheet_names = data_with_column_names.values()
#         for sheet in sheet_names:
#             data_taking_column = sheet[
#                 ['postgres_tab_name', 'postgres_column_name', 'postgres_datatype', 'CHARACTER_MAXIMUM_LENGTH']]
#             data_taking_column_df2 = data_taking_column.values.tolist()
#             for table_name in unique_data_varibles_2:
#                 for col_name in unique_column_names:
#                     table_name = table_name.upper()
#                     column_name = col_name.upper()
#                     for id in data_taking_column_df2:
#                         if (table_name in id) and (column_name in id):
#                             if id not in data_excels_storing:
#                                 data_excels_storing.append(id)
#     except Exception as error:
#         print('Excel sheet not found', error)
#     return data_excels_storing
#
#



# def declaring_variables(data_taking_column_df2_list, variable_withcolumn,dictionary_format):
#     ''' Forming a declare statement with the help of data type which we have collected from excel sheet '''
#     datatypes = []
#     for vars in variable_withcolumn:
#         compare_data_0 = vars.rsplit('_', 1)[0]
#         compare_data_1 = vars.rsplit('_', 1)[1]
#         for key,value in dictionary_format.items():
#             if key == compare_data_0:
#                 for des in data_taking_column_df2_list:
#                     if (des[1] == compare_data_1.upper()) and (des[0] == value.upper()):
#                         des_dtype = des[2]
#                         des_dtype_value = des[3]
#                         if des_dtype_value != 'NAN':
#                             dtype_length = math.ceil(float(des_dtype_value))
#                             declare_variables = vars + ' ' + des_dtype + '(' + str(dtype_length) + ')[];'
#                             if declare_variables not in datatypes :
#                                 datatypes.append(declare_variables)
#                         else:
#                             declare_variables = vars + ' ' + des_dtype + '[];'
#                             if declare_variables not in datatypes :
#                                 datatypes.append(declare_variables)
#     return datatypes
#
#
# def coll_call_str(collection_string, cschema_type):  # Assigned by Prathyusha
#     collection_string = handling_spaces(collection_string)
#     collection_string, table_names, variable_names,dictionary_format= declare_begin_data(collection_string)
#     coll_str_begin_before = re.split(r'\bbegin\s', collection_string, 1, flags=re.I)[0]
#     coll_str_begin_after = re.split(r'\bbegin\s', collection_string, 1, flags=re.I)[1]
#     append_data = []
#     column_names = []
#     '''Searching for the variable from begin to end of the string which we have collected from from declare to begin block and taking the name after that variable
#     and replace the data between vaiable and . with underscore
#      '''
#     for bvar in variable_names:
#         data_coleqls = re.findall(rf'\s{bvar}\b.*?\.\S+', coll_str_begin_after, flags=re.DOTALL | re.I)
#         data_coleqls = [i.strip() for i in data_coleqls if i != '']
#         if data_coleqls:
#             for i in data_coleqls:
#                 i = i.replace(',', '').replace(';', '').strip()
#                 between_data = re.findall(rf'\b{bvar}\b(.*?)\.', i, flags=re.DOTALL | re.I)[0] + '.'
#                 if between_data in i:
#                     i_mod = i.replace(between_data, '_')
#                     append_data.append(i_mod)
#                     # new changes
#                     getting_i_value = between_data.replace('(', '').replace(')', '').replace('.', '').strip()
#                     modified_i_mod = i_mod + '[' + getting_i_value + ']'
#                     coll_str_begin_after = coll_str_begin_after.replace(i, modified_i_mod)
#                     # end new changes
#                 column_names.append(i.split('.')[1])
#     variable_withcolumn = list(set(append_data))
#     unique_data_varibles_2 = list(set(table_names))
#     unique_column_names = list(set(column_names))
#     data_excels_storing = reading_storage_sheet(unique_data_varibles_2, unique_column_names, cschema_type)
#     datatypes = declaring_variables(data_excels_storing, variable_withcolumn,dictionary_format)
#     final_data = coll_str_begin_before + '\n'.join(datatypes) + '\n' + 'begin ' + coll_str_begin_after
#     final_data = final_data.replace(' .', '.')
#     collection_string = final_data
#     return collection_string


# function  main
def main(source_code):
    # start writing code here

    return source_code

# calling main function here
#if __name__ == '__main__':
output = main(source_code)

