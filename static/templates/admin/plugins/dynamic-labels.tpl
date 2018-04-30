<form role="form" class="dynamic-labels-settings">
	<div class="row">
		<div class="col-sm-2 col-xs-12 settings-header">Custom Labels</div>
		<div class="col-sm-10 col-xs-12">
			<input type="hidden" name="labels" id="standaloneStatuses" />
			<h4 class="well" id="standaloneStatusesList"></h4>
			<button type="button" id="newStatus" class="btn btn-primary">New Label</button>
		</div>
	</div>
</form>

<div class="modal fade" id="newStatus-modal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Create New Label</h4>
			</div>
			<div class="modal-body">
				<h1 class="text-center"><span id="preview" class="label" style="background-color: #000000; color: #ffffff; border: 1px solid #000000;">Label</span></h1>

				<div class="form-group">
					<label for="status">Unique Identifier <small>Alphanumeric only; no spaces. This identifier is only for internal tracking purposes.</small></label>
					<input type="text" class="form-control" name="id" placeholder="label" /><br />
				</div>

				<div class="form-group">
					<label for="status">Label Text</label>
					<input type="text" class="form-control" name="status" value="Label" placeholder="Label" /><br />
				</div>

				<div class="form-group">
					<label for="bgColor">Background Color</label>
					<input type="text" class="form-control colorinput" name="bgColor" value="#000000" placeholder="#000000" /><br />
				</div>

				<div class="form-group">
					<label for="color">Foreground Color</label>
					<input type="text" class="form-control colorinput" name="color" value="#ffffff" placeholder="#ffffff" /><br />
				</div>

				<div class="form-group">
					<label for="borderColor">Border Color</label>
					<input type="text" class="form-control colorinput" name="borderColor" value="#000000" placeholder="#000000" /><br />
				</div>

				<div class="form-group">
					<label for="type">Type</label>
					<select class="form-control" name="type">
						<option value="created">Created Date</option>
						<option value="updated">Last Updated Date</option>
					</select>
				</div><br />

				<div class="form-group">
					<label for="color">Maximum Days Since Created or Last Updated</label>
					<input type="text" class="form-control" name="days" value="1" placeholder="1" /><br />
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">[[global:buttons.close]]</button>
				<button type="button" class="btn btn-primary" id="saveStatus">[[global:save]]</button>
			</div>
		</div>
	</div>
</div>

<button id="save" class="floating-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
	<i class="material-icons">save</i>
</button>